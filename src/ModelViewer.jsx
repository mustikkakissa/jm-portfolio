import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useFBX, useGLTF, Environment } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { useLoader } from '@react-three/fiber'
import './ModelViewer.css'

// Hook for lazy loading - only loads when element is in viewport
function useInViewport(ref) {
  const [isInViewport, setIsInViewport] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isInViewport
}

// FBX Model Component
function FBXModel({ url, onLoad }) {
  const fbx = useFBX(url)
  const ref = useRef()

  useEffect(() => {
    if (fbx && onLoad) {
      onLoad()
    }
  }, [fbx, onLoad])

  return (
    <primitive 
      ref={ref} 
      object={fbx} 
      scale={0.01}
    />
  )
}

// GLB/GLTF Model Component
function GLTFModel({ url, onLoad }) {
  const gltf = useGLTF(url)
  const ref = useRef()

  useEffect(() => {
    if (gltf && onLoad) {
      onLoad()
    }
  }, [gltf, onLoad])

  return (
    <primitive 
      ref={ref} 
      object={gltf.scene} 
      scale={1}
    />
  )
}

// OBJ Model Component (with optional MTL support)
function OBJModel({ url, onLoad }) {
  const ref = useRef()
  const [objLoaded, setObjLoaded] = useState(false)
  
  // Extract directory and base name for MTL
  const urlParts = url.split('/')
  const fileName = urlParts[urlParts.length - 1]
  const baseName = fileName.replace('.obj', '')
  const directory = urlParts.slice(0, -1).join('/')
  const mtlPath = `${directory}/${baseName}.mtl`

  // Try to load MTL file if it exists
  let materials = null
  try {
    materials = useLoader(MTLLoader, mtlPath)
  } catch (e) {
    // MTL file doesn't exist, that's okay
  }

  // Load OBJ
  const obj = useLoader(OBJLoader, url, (loader) => {
    if (materials) {
      materials.preload()
      loader.setMaterials(materials)
    }
  })

  useEffect(() => {
    if (obj && !objLoaded) {
      setObjLoaded(true)
      if (onLoad) {
        onLoad()
      }
    }
  }, [obj, objLoaded, onLoad])

  return (
    <primitive 
      ref={ref} 
      object={obj} 
      scale={1}
    />
  )
}

// Main Model Component that detects format
function Model({ url, onLoad }) {
  const extension = url.split('.').pop().toLowerCase()
  
  if (extension === 'fbx') {
    return <FBXModel url={url} onLoad={onLoad} />
  } else if (extension === 'glb' || extension === 'gltf') {
    return <GLTFModel url={url} onLoad={onLoad} />
  } else if (extension === 'obj') {
    return <OBJModel url={url} onLoad={onLoad} />
  }
  
  return null
}

function ModelViewer({ modelPath, width = '100%', height = '500px' }) {
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef(null)
  const isInViewport = useInViewport(containerRef)

  const handleModelLoad = () => {
    setIsLoading(false)
  }

  return (
    <div ref={containerRef} className="model-viewer-container" style={{ width, height }}>
      {!isInViewport ? (
        <div className="model-loading">
          <div className="model-loading-spinner"></div>
          <div className="model-loading-text">Preparing 3D viewer...</div>
        </div>
      ) : (
        <>
          {isLoading && (
            <div className="model-loading">
              <div className="model-loading-spinner"></div>
              <div className="model-loading-text">Loading 3D model...</div>
            </div>
          )}
          <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <Suspense fallback={null}>
              <Stage
                intensity={0.5}
                environment="city"
                shadows={{ type: 'contact', opacity: 0.5, blur: 2 }}
                adjustCamera={1.2}
              >
                <Model url={modelPath} onLoad={handleModelLoad} />
              </Stage>
              <Environment preset="city" />
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={1}
                maxDistance={20}
              />
            </Suspense>
          </Canvas>
          <div className="viewer-controls-hint">
            🖱️ Click and drag to rotate • Scroll to zoom • Right-click to pan
          </div>
        </>
      )}
    </div>
  )
}

export default ModelViewer


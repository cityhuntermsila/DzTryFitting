
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ViewState, Language, Landmark, Garment, Pose } from '../types';
import { I18N, ALL_GARMENTS, DEFAULT_LANDMARKS, POSES } from '../constants';
import { generateTryOn, validateFullBody } from '../services/geminiService';

interface StudioProps {
    lang: Language;
    initialGarment?: Garment | null;
}

const Studio: React.FC<StudioProps> = ({ lang, initialGarment }) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [userImage, setUserImage] = useState<string | null>(null);
    const [landmarks, setLandmarks] = useState<Landmark[]>(DEFAULT_LANDMARKS);

    // Validation State
    const [validationError, setValidationError] = useState<string | null>(null);
    const [pendingImage, setPendingImage] = useState<string | null>(null);

    // Camera State
    const [isCameraActive, setIsCameraActive] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Garment Selection State
    const [garmentMode, setGarmentMode] = useState<'collection' | 'upload'>('collection');
    const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
    const [customGarmentImage, setCustomGarmentImage] = useState<string | null>(null);
    const [isGarmentDragOver, setIsGarmentDragOver] = useState(false);

    // Pose Selection State
    const [selectedPose, setSelectedPose] = useState<Pose>(POSES[0]);

    const [isProcessing, setIsProcessing] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [sliderPos, setSliderPos] = useState(50);

    // Dragging logic
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const garmentInputRef = useRef<HTMLInputElement>(null);

    const garmentListSidebarRef = useRef<HTMLDivElement>(null);

    // Shop Modal State
    const [isShopModalOpen, setIsShopModalOpen] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        size: 'M',
        quantity: 1,
        fullName: '',
        phone: '',
        address: ''
    });

    const getLp = (id: string) => landmarks.find(l => l.id === id);

    useEffect(() => {
        if (initialGarment) {
            setSelectedGarment(initialGarment);
            setGarmentMode('collection');
        }
    }, [initialGarment]);

    useEffect(() => {
        if (isCameraActive) {
            let stream: MediaStream | null = null;
            const startStream = async () => {
                try {
                    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
                    streamRef.current = stream;
                    setTimeout(() => {
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                            videoRef.current.play().catch(e => console.log("Play error", e));
                        }
                    }, 100);
                } catch (err) {
                    console.error("Camera access error:", err);
                    setIsCameraActive(false);
                }
            };
            startStream();
            return () => {
                if (stream) stream.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            };
        }
    }, [isCameraActive]);

    const capturePhoto = async () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(videoRef.current, 0, 0);
                const dataUrl = canvas.toDataURL('image/png');

                setValidationError(null);
                setPendingImage(dataUrl);
                setIsValidating(true);
                try {
                    const validation = await validateFullBody(dataUrl);
                    if (validation.isValid) {
                        setUserImage(dataUrl);
                        setIsCameraActive(false);
                        setPendingImage(null);
                    } else {
                        setValidationError(validation.reason || "Photo non conforme");
                    }
                } catch (e) {
                    setValidationError("Erreur technique de validation.");
                } finally {
                    setIsValidating(false);
                }
            }
        }
    };

    const forceUseImage = () => {
        if (pendingImage) {
            setUserImage(pendingImage);
            setIsCameraActive(false);
            setValidationError(null);
            setPendingImage(null);
        }
    };

    const processFile = (file: File, isUserImage: boolean) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const resultData = event.target?.result as string;
                if (isUserImage) {
                    setValidationError(null);
                    setPendingImage(resultData);
                    setIsValidating(true);
                    try {
                        const validation = await validateFullBody(resultData);
                        if (validation.isValid) {
                            setUserImage(resultData);
                            setIsCameraActive(false);
                            setPendingImage(null);
                        } else {
                            setValidationError(validation.reason || "Photo non conforme");
                        }
                    } catch (e) {
                        setValidationError("Erreur technique de validation.");
                    } finally {
                        setIsValidating(false);
                    }
                } else {
                    setCustomGarmentImage(resultData);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) processFile(e.target.files[0], true);
    };

    const handleGarmentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) processFile(e.target.files[0], false);
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0], true);
    };

    const handleGarmentDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsGarmentDragOver(true); };
    const handleGarmentDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsGarmentDragOver(false); };
    const handleGarmentDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsGarmentDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0], false);
    };

    const handleCamera = () => {
        setValidationError(null);
        setPendingImage(null);
        setIsCameraActive(true);
        setUserImage(null);
    };

    const handleMouseDown = (id: string) => setDraggingId(id);
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!draggingId || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setLandmarks(prev => prev.map(l => l.id === draggingId ? { ...l, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } : l));
    };
    const handleMouseUp = () => setDraggingId(null);

    const handleGenerate = async () => {
        if (!userImage) return;
        setIsProcessing(true);
        try {
            let result;
            const posePrompt = selectedPose ? selectedPose.prompt : undefined;
            if (garmentMode === 'collection' && selectedGarment) {
                let description = selectedGarment.description;
                if (selectedGarment.selectedColor) description += ` Color: ${selectedGarment.selectedColor}.`;
                result = await generateTryOn(userImage, description, landmarks, selectedGarment.image, posePrompt);
            } else if (garmentMode === 'upload' && customGarmentImage) {
                result = await generateTryOn(userImage, "Custom garment", landmarks, customGarmentImage, posePrompt);
            }
            if (result) setResultImage(result);
        } catch (error) {
            alert("Erreur de génération. Vérifiez votre clé API.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setResultImage(null);
        setStep(1);
        setUserImage(null);
        setCustomGarmentImage(null);
        setSelectedGarment(null);
        setIsCameraActive(false);
        setValidationError(null);
        setPendingImage(null);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen flex flex-col gap-8">

            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-4">
                <div className={`flex items-center ${step === 1 ? 'text-brand-600' : 'text-gray-400'}`}>
                    <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">1</div>
                    <span className="mx-2 font-serif">{I18N.upload_photo[lang]}</span>
                </div>
                <div className="w-16 h-0.5 bg-gray-200 mx-4"></div>
                <div className={`flex items-center ${step === 2 || resultImage ? 'text-brand-600' : 'text-gray-400'}`}>
                    <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">2</div>
                    <span className="mx-2 font-serif">{I18N.select_garment[lang]}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8">
                    <div
                        className={`
                  bg-white rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 min-h-[500px] relative flex items-center justify-center
                  ${!userImage && !isCameraActive && isDragOver ? 'border-brand-500 bg-brand-50' : 'border-gray-100'}
                  ${isCameraActive ? 'bg-black' : ''}
              `}
                        onDragOver={!userImage && !isCameraActive ? handleDragOver : undefined}
                        onDragLeave={!userImage && !isCameraActive ? handleDragLeave : undefined}
                        onDrop={!userImage && !isCameraActive ? handleDrop : undefined}
                    >
                        {!userImage ? (
                            isCameraActive ? (
                                <div className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center bg-black">
                                    <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]" />
                                    <div className="absolute bottom-6 flex items-center gap-8 z-20">
                                        <button onClick={() => !isValidating && setIsCameraActive(false)} disabled={isValidating} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20"><i className="fa-solid fa-xmark"></i></button>
                                        <button onClick={capturePhoto} disabled={isValidating} className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-transparent transition-all shadow-lg active:scale-95 ${isValidating ? 'opacity-50 cursor-wait' : 'hover:bg-white/10'}`}>
                                            {isValidating ? <i className="fa-solid fa-spinner fa-spin text-white text-2xl"></i> : <div className="w-16 h-16 bg-brand-600 rounded-full border-2 border-white"></div>}
                                        </button>
                                        <div className="w-12 h-12"></div>
                                    </div>
                                    {isValidating && <div className="absolute inset-0 bg-black/50 z-30 flex flex-col items-center justify-center text-white"><i className="fa-solid fa-circle-notch fa-spin text-4xl mb-3 text-brand-500"></i><p className="font-serif tracking-wider">Analyse de posture...</p></div>}
                                </div>
                            ) : (
                                <div className={`text-center p-12 animate-fade-in ${isDragOver ? 'scale-105 transition-transform' : ''} relative`}>
                                    {isValidating && <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center rounded-3xl"><i className="fa-solid fa-circle-notch fa-spin text-4xl mb-3 text-brand-600"></i><p className="font-serif tracking-wider text-gray-900">Vérification de la photo...</p></div>}
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors ${isDragOver ? 'bg-white' : 'bg-brand-50'}`}><i className={`fa-solid fa-cloud-arrow-up text-3xl ${isDragOver ? 'text-brand-600' : 'text-brand-500'}`}></i></div>
                                    <h3 className="text-2xl font-serif text-gray-800 mb-2">{I18N.upload_photo[lang]}</h3>
                                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">Déposez votre photo en pied pour commencer l'essayage.</p>
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="flex justify-center gap-4">
                                            <button onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg"><i className="fa-regular fa-folder-open mr-2"></i> Choisir un fichier</button>
                                            <button onClick={handleCamera} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"><i className="fa-solid fa-camera mr-2"></i> Caméra</button>
                                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </div>

                                        {validationError && (
                                            <div className="animate-fade-in bg-white border border-brand-100 p-6 rounded-2xl shadow-xl max-w-md flex flex-col gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0"><i className="fa-solid fa-triangle-exclamation text-brand-600"></i></div>
                                                    <div className="text-left"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">IA en doute</p><p className="text-sm font-medium text-gray-700">{validationError}</p></div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => { setValidationError(null); setPendingImage(null); }} className="flex-1 py-2 text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">Réessayer</button>
                                                    <button onClick={forceUseImage} className="flex-1 py-2 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors flex items-center justify-center gap-2"><i className="fa-solid fa-check-double"></i> Utiliser quand même</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        ) : resultImage ? (
                            <div className="relative w-full h-full select-none" style={{ minHeight: '600px' }}>
                                <img src={userImage} alt="Original" className="absolute inset-0 w-full h-full object-contain bg-gray-100" />
                                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}><img src={resultImage} alt="Result" className="absolute w-full h-full object-contain max-w-none" style={{ width: '100%', height: '100%' }} /></div>
                                <div className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ left: `${sliderPos}%` }}><div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center shadow-lg"><i className="fa-solid fa-arrows-left-right text-white text-xs"></i></div></div>
                                <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20" />
                                <div className="absolute bottom-4 right-4 z-30">
                                    <button onClick={handleReset} className="bg-white/90 backdrop-blur text-gray-900 px-4 py-2 rounded-lg shadow-lg text-sm font-semibold hover:bg-white mr-2">Recommencer</button>
                                    <a href={resultImage} download="dz_fitting_result.png" className="bg-brand-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold hover:brand-700">Télécharger</a>
                                </div>
                            </div>
                        ) : (
                            <div ref={containerRef} className="relative w-full h-full cursor-crosshair bg-gray-100" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                                <img src={userImage} alt="Calibration" className="w-full h-full object-contain select-none pointer-events-none" />
                                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50 overflow-visible" preserveAspectRatio="none">
                                    <g filter="url(#glow)">
                                        {(() => {
                                            const neck = getLp('neck'), ls = getLp('l_shoulder'), rs = getLp('r_shoulder'), waist = getLp('waist'), lh = getLp('l_hip'), rh = getLp('r_hip'), la = getLp('l_ankle'), ra = getLp('r_ankle');
                                            if (!ls || !rs || !lh || !rh || !waist || !neck || !la || !ra) return null;
                                            return (<path d={`M ${ls.x},${ls.y} L ${neck.x},${neck.y} L ${rs.x},${rs.y} M ${ls.x},${ls.y} L ${waist.x},${waist.y} L ${rs.x},${rs.y} M ${waist.x},${waist.y} L ${lh.x},${lh.y} L ${rh.x},${rh.y} L ${waist.x},${waist.y} M ${lh.x},${lh.y} L ${la.x},${la.y} M ${rh.x},${rh.y} L ${ra.x},${ra.y}`} fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="4,2" vectorEffect="non-scaling-stroke" />);
                                        })()}
                                    </g>
                                </svg>
                                <div className="absolute top-4 left-0 right-0 text-center pointer-events-none flex flex-col items-center gap-2">
                                    <span className="bg-black/80 text-white px-6 py-2 rounded-full text-sm backdrop-blur-md shadow-2xl border border-white/10 flex items-center gap-2"><i className="fa-solid fa-arrows-to-dot text-accent-400"></i>Ajustez les points de coupe</span>
                                    <button onClick={() => setUserImage(null)} className="pointer-events-auto mt-2 bg-white/20 hover:bg-white/40 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md transition-colors border border-white/10">Changer de photo</button>
                                </div>
                                {landmarks.map((l) => (
                                    <div key={l.id} className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-white shadow-[0_0_15px_rgba(212,175,55,0.5)] cursor-move flex items-center justify-center group hover:scale-125 transition-transform z-10 ${l.id === draggingId ? 'bg-accent-500 scale-110' : 'bg-accent-400 hover:bg-accent-500'}`} style={{ left: `${l.x}%`, top: `${l.y}%` }} onMouseDown={() => handleMouseDown(l.id)}>
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        <div className="absolute bottom-full mb-3 whitespace-nowrap bg-luxury-dark/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">{l.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6 sticky top-8">
                    {!resultImage && (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col max-h-[calc(100vh-100px)] overflow-hidden">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 shrink-0">
                                <h3 className="font-serif text-xl text-gray-900">{I18N.select_garment[lang]}</h3>
                                <div className="flex bg-gray-100 p-1 rounded-lg">
                                    <button onClick={() => setGarmentMode('collection')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${garmentMode === 'collection' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Collection</button>
                                    <button onClick={() => setGarmentMode('upload')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${garmentMode === 'upload' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Upload</button>
                                </div>
                            </div>
                            {garmentMode === 'upload' && (
                                <div className="mb-6">
                                    <div className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all min-h-[200px] ${customGarmentImage ? 'border-brand-200 bg-brand-50/30' : 'border-gray-200 hover:border-gray-300'}`} onDragOver={handleGarmentDragOver} onDragLeave={handleGarmentDragLeave} onDrop={handleGarmentDrop}>
                                        {customGarmentImage ? (
                                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                                <div className="relative w-full h-40 mb-4"><img src={customGarmentImage} alt="Custom" className="w-full h-full object-contain rounded-lg shadow-sm" /><button onClick={() => setCustomGarmentImage(null)} className="absolute -top-2 -right-2 bg-white text-red-500 w-8 h-8 rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-colors"><i className="fa-solid fa-trash"></i></button></div>
                                                <p className="text-sm font-medium text-brand-700">Vêtement chargé</p>
                                            </div>
                                        ) : (
                                            <><div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-gray-100"><i className="fa-solid fa-shirt text-xl text-gray-400"></i></div><p className="text-sm font-medium text-gray-900 mb-1">Upload Garment</p><button onClick={() => garmentInputRef.current?.click()} className="px-4 py-2 bg-gray-900 text-white text-xs rounded-lg hover:bg-gray-800 transition-colors">Choisir fichier</button><input type="file" ref={garmentInputRef} className="hidden" accept="image/*" onChange={handleGarmentFileChange} /></>
                                        )}
                                    </div>
                                </div>
                            )}
                            {garmentMode === 'collection' && (
                                <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pr-1">
                                    {ALL_GARMENTS.map(g => (
                                        <div key={g.id} onClick={() => setSelectedGarment(g)} className={`flex items-center gap-4 p-3 rounded-xl border-2 transition-all mb-3 cursor-pointer ${selectedGarment?.id === g.id ? 'border-brand-500 bg-brand-50' : 'border-gray-50 hover:border-gray-200'}`}>
                                            <img src={g.image} className="w-16 h-20 rounded-lg object-cover bg-gray-100" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold truncate">{g.name}</h4>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{g.region}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {userImage && !resultImage && (
                        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden shrink-0">
                            <div className="mb-6">
                                <h4 className="font-serif text-sm mb-3 opacity-90 uppercase tracking-widest">Pose de sortie</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {POSES.map(pose => (
                                        <button key={pose.id} onClick={() => setSelectedPose(pose)} className={`flex flex-col items-center p-2 rounded-lg border transition-all ${selectedPose.id === pose.id ? 'bg-white text-brand-700 border-white' : 'bg-brand-700/50 border-transparent text-brand-100'}`}>
                                            <i className={`fa-solid ${pose.icon} mb-1`}></i><span className="text-[9px] font-bold">{pose.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button onClick={handleGenerate} disabled={isProcessing || (garmentMode === 'collection' && !selectedGarment) || (garmentMode === 'upload' && !customGarmentImage)} className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${isProcessing ? 'bg-gray-500/50' : 'bg-accent-500 hover:bg-accent-400 text-white shadow-lg'}`}>
                                {isProcessing ? <><i className="fa-solid fa-spinner fa-spin"></i>{I18N.generating[lang]}</> : <><i className="fa-solid fa-wand-magic-sparkles"></i>{I18N.generate[lang]}</>}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Studio;

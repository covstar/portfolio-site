import React from 'react';
import './create.css';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import NearMeIcon from '@mui/icons-material/NearMe';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useRedirect } from 'react-admin';


const ContentCreation = () => {
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [caption, setCaption] = React.useState('');
    const [title, setTitle] = React.useState('');
    const textareaRef = React.useRef();
    const redirect = useRedirect();



    const addFiles = event => {
        const newFiles = Array.from(event.target.files);
        if (selectedFiles.length + newFiles.length <= 5) {
            setSelectedFiles([...selectedFiles, ...newFiles]);
        } else {
            toast.warning("You can only upload 5 files");
        }
    };
    // console.log(selectedFiles);
    const singleFileRemove = fileToRemove => {
        setSelectedFiles(selectedFiles.filter(file => file !== fileToRemove));
    };
    const allFilesDelete = () => {
        setSelectedFiles([]);
        setTitle('');
        setCaption('');
    };


    React.useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit';
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${scrollHeight}px`;
        }
    }, [caption]);

    const style = caption
        ? { resize: 'none', overflow: 'auto', maxHeight: '100px', borderRadius: '6px', position: 'relative' }
        : { resize: 'none', overflow: 'auto', maxHeight: '100px' };

    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (!selectedFiles || selectedFiles.length === 0) {
            console.error('No files selected');
            return;
        }

        const cloudinaryUploadTasks = selectedFiles.map(async file => {
            const cloudName = `${import.meta.env.VITE_CLOUD_NAME}`;
            const uploadPreset = `${import.meta.env.VITE_UPLOAD_PRESET}`;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);

            // Determine the folder based on file type
            const fileType = file.type.split('/')[0]; // This will give 'image' or 'video'
            const folder = (fileType === 'image') ? 'images' : 'videos';
            formData.append('folder', folder);

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
                method: 'POST',
                body: formData,
            });

            const cloudinaryData = await response.json();

            // Get the URL of the uploaded asset
            let url = cloudinaryData.secure_url;

            // Add transformations to the URL
            url += "/q_auto:best,f_auto";

            return url;
        });

        // Wait for all Cloudinary upload tasks to complete
        const cloudinaryMediaUrls = await Promise.all(cloudinaryUploadTasks);


        // firebase upload
        try {
            await addDoc(collection(db, 'projects'), {
                media: cloudinaryMediaUrls,
                content: content,
                title: title,
                time: `${new Date()}`,
            })
            setSelectedFiles([]);
            setTitle('');
            setCaption('');
            toast.success("uploaded succsessfully")
            redirect('/')
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <>
            <div className='create_container'>


                <div className=''>
                    {selectedFiles && selectedFiles.length > 0 ? (
                        <>
                            <div className=' selectedFiles_container'>
                                {selectedFiles.map((file, index) => {
                                    const url = file instanceof Blob ? URL.createObjectURL(file) : file;
                                    const isVideo = file.type.startsWith('video');

                                    return (
                                        <div key={index}>
                                            {isVideo ? (
                                                <div>

                                                    <video
                                                        src={url}
                                                        className=""
                                                        playsInline={true}
                                                        controls={false}
                                                        muted
                                                        controlsList="nodownload"
                                                    />
                                                    <span className='file_remove_icon' onClick={() => singleFileRemove(file)}>
                                                        <CancelIcon fontSize='large' className=' text-[#DA0037]' />
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="files">

                                                    <img src={url} alt="" className="h-full w-full object-cover" />
                                                    <span className='file_remove_icon' onClick={() => singleFileRemove(file)}>
                                                        <CancelIcon fontSize='large' className=' text-[#DA0037]' />

                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <form onSubmit={handleFileUpload}>

                                {/* input section  */}
                                <div className='caption__container' >

                                    <textarea
                                        type='text'
                                        placeholder='Add caption (optional)'
                                        rows={1}
                                        ref={textareaRef}
                                        style={style}
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                    />

                                    <input
                                        className=''
                                        type='text'
                                        placeholder='Add title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />

                                    <div onClick={allFilesDelete} className='text-center text-[18px] mt-[1rem] flex gap-x-4 flex-row-reverse w-fit font-[600] cursor-pointer'>
                                        <button className='form__button'>Send</button>
                                        <button className='bg-[#da0037] text-white flex items-center px-[1rem] py-[.4rem] rounded-md'>
                                            <DeleteForeverIcon sx={{ fontSize: '30px', }} />
                                            <p>Trash All</p>
                                        </button>
                                    </div>
                                </div>

                            </form>

                        </>
                    ) : (
                        <div className='text-center flex flex-col items-center justify-center my-auto mx-auto max-w-[450px] h-[300px]  outline-dashed outline-1 rounded-lg mt-[3rem] laptop:mt-[20%]'>
                            <label htmlFor="file">
                                    <span ><AddIcon sx={{ fontSize: ['60px', '60px', '70px', '80px', '90px', '100px'], }} className='bg-[#171717] rounded-[50%] text-[#ededed] cursor-pointer' /></span>
                                    <p className='mt-[.5rem] font-[600]'>Select files</p>
                                <input type="file" id="file" accept="image/*,video/*" style={{ display: "none" }} multiple onChange={addFiles} />
                            </label>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default ContentCreation
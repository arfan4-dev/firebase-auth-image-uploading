import React, { useContext, useEffect, useState } from 'react';
import { authProvider } from '../Component/AuthProvider/Provider';
import '../Pages/Login/login.css';
import { storageRef } from '../utils/firbase/firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const [docxList, setDocxList] = useState([]);
  const { user, logout } = useContext(authProvider);

  const listImageRef = ref(storageRef, `images/${user.uid}/`);
  const listPdfRef = ref(storageRef, `pdfs/${user.uid}/`);
  const listDocxRef = ref(storageRef, `docx/${user.uid}/`);

  const imageUpload = () => {
    if (uploadImage === null) return;
    const imageRef = ref(listImageRef, `${uploadImage.name + Date.now()}`);
    uploadBytes(imageRef, uploadImage)
      .then(() => {
        alert('File uploaded');
        fetchImageList();
        fetchDocxList();
        fetchPdfList();
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const fetchImageList = () => {
    listAll(listImageRef)
      .then((res) => {
        const promises = res.items.map((item) => getDownloadURL(item));
        Promise.all(promises)
          .then((urls) => {
            setImageList(urls);
          })
          .catch((error) => {
            console.error('Error fetching image URLs:', error);
          });
      })
      .catch((error) => {
        console.error('Error listing images:', error);
      });
  };

  const fetchPdfList = () => {
    listAll(listPdfRef)
      .then((res) => {
        const promises = res.items.map((item) => getDownloadURL(item));
        Promise.all(promises)
          .then((urls) => {
            setPdfList(urls);
          })
          .catch((error) => {
            console.error('Error fetching PDF URLs:', error);
          });
      })
      .catch((error) => {
        console.error('Error listing PDFs:', error);
      });
  };

  const fetchDocxList = () => {
    listAll(listDocxRef)
      .then((res) => {
        const promises = res.items.map(async (item) => {
          const name = item.name;
          const downloadUrl = await getDownloadURL(item);
          return { name, downloadUrl };
        });
        Promise.all(promises)
          .then((docxs) => {
            setDocxList(docxs);
          })
          .catch((error) => {
            console.error('Error fetching DOCX files:', error);
          });
      })
      .catch((error) => {
        console.error('Error listing DOCX files:', error);
      });
  };

  useEffect(() => {
    if (!user) return;
    fetchImageList();
    fetchPdfList();
    fetchDocxList();
  }, [user]);

  const getFileExtension = (url) => {
    return url.split('.').pop().slice(0,4).toLowerCase();
  };

  const renderFiles = (fileList) => {
    return fileList.map((url) => {
      const fileExtension = getFileExtension(url);

      if (['png', 'jpg', 'jpeg', 'svg'].includes(fileExtension)) {
        return (
          <div key={url}>
            <img src={url} alt="img" id="image" />
          </div>
        );
      } else if (fileExtension === 'pdf') {
        return (
          <div key={url}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              PDF Document
            </a>
          </div>
        );
      } else if (fileExtension === 'docx') {
        return (
          <div key={url}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              DOCX Document
            </a>
          </div>
        );
      } else {
        // Handle other file types as needed
        return (
          <div key={url}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              pdf Document
            </a>
          </div>
        );
      }
    });
  };

  if (!user) {
    return navigate('/');
  }

  return (
    <div>
      <div id="divBetween">
        <div>
          <div className="file-input">
            <input
              type="file"
              id="file"
              className="file"
              onChange={(e) => {
                setUploadImage(e.target.files[0]);
              }}
            />
            <label htmlFor="file">
              Select file
              <p className="file-name"></p>
            </label>
          </div>
          <button onClick={imageUpload} className="button-30">
            <span className="button__text">Upload image</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              logout();
            }}
            className="button-30"
          >
            <span className="button__text">Log out</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div id="imgDiv">{renderFiles(imageList)}</div>

      <div>{renderFiles(pdfList)}</div>

      <div>{renderFiles(docxList)}</div>
    </div>
  );
};

export default Dashboard;




// import React, { useContext, useEffect, useState } from 'react';
// import { authProvider } from '../Component/AuthProvider/Provider';
// import '../Pages/Login/login.css';
// import { storageRef } from '../utils/firbase/firebase';
// import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
// import './dashboard.css';

// const Dashboard = () => {
//   const [uploadFile, setUploadFile] = useState(null);
//   const [fileList, setFileList] = useState([]);
//   const [imageList, setImageList] = useState([]);
//   const { logout,user } = useContext(authProvider);

//   const listFileRef = ref(storageRef, 'files/');
//   const listImageRef = ref(storageRef, 'images/');

//   const fileUpload = () => {
//     if (uploadFile === null) return;
//     const fileRef = ref(storageRef, `files/${uploadFile.name + Date.now()}`);
//     const isImage = uploadFile.type.startsWith('images/${user.uid}/');

//     uploadBytes(fileRef, uploadFile)
//       .then(() => {
//         alert('File uploaded');
//         return getDownloadURL(fileRef); // Fetch the URL of the uploaded file
//       })
//       .then((url) => {
//         // Update fileList with the new URL without duplications
//         if (!fileList.includes(url)) {
//           setFileList((prev) => [...prev, { url, isImage }]);
//         }
//         // If it's an image, also add it to imageList for preview
//         if (isImage) {
//           setImageList((prev) => [...prev, url]);
//         }
//       })
//       .catch((error) => {
//         console.error('Error uploading file:', error);
//       });
//   };

//   useEffect(() => {
//     // Fetch and populate the fileList on component mount
//     listAll(listFileRef)
//       .then((res) => {
//         const promises = res.items.map((item) => getDownloadURL(item));
//         Promise.all(promises)
//           .then((urls) => {
//             const files = urls.map((url) => ({
//               url,
//               isImage: url.startsWith('https://firebasestorage.googleapis.com/v0/b/your-project-id/o/images%2F'),
//             }));
//             setFileList(files);
//           })
//           .catch((error) => {
//             console.error('Error fetching file URLs:', error);
//           });
//       })
//       .catch((error) => {
//         console.error('Error listing files:', error);
//       });

//     // Fetch and populate the imageList on component mount
//     listAll(listImageRef)
//       .then((res) => {
//         const promises = res.items.map((item) => getDownloadURL(item));
//         Promise.all(promises)
//           .then((urls) => {
//             setImageList(urls);
//           })
//           .catch((error) => {
//             console.error('Error fetching image URLs:', error);
//           });
//       })
//       .catch((error) => {
//         console.error('Error listing images:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <div id='divBetween'>
//         <div>
//           <div class="file-input">
//             <input
//               type="file"
//               id="file"
//               class="file"
//               onChange={(e) => {
//                 setUploadFile(e.target.files[0]);
//               }}
//             />
//             <label for="file">
//               Select file
//               <p class="file-name"></p>
//             </label>
//           </div>
//           <button onClick={fileUpload} className="button-30">
//             <span className="button__text">Upload file</span>
//             <i className="button__icon fas fa-chevron-right"></i>
//           </button>
//         </div>
//         <div>
//           <button
//             onClick={() => {
//               logout();
//             }}
//             className="button-30"
//           >
//             <span className="button__text">Log out</span>
//             <i className="button__icon fas fa-chevron-right"></i>
//           </button>
//         </div>
//       </div>

//       {/* <div id='imgDiv'>
//         {imageList.map((url) => {
//           return (
//             <div key={url}>
//               <img src={url} alt="" id='image' />
//             </div>
//           );
//         })}
//       </div> */}

//       <div id='imgDiv'>
//         {fileList.map((file, index) => {
//           return (
//             <div key={index}>
//               {file.isImage ? (
//                 <img src={file.url} width="200" height="200" alt="Uploaded" imgDiv/>
                
//               ) : (
//                 <a href={file.url} target="_blank" rel="noopener noreferrer">
//                   <img width="100" height="100" src="https://img.icons8.com/ios-filled/50/file.png" alt="file"/>
//                 </a>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

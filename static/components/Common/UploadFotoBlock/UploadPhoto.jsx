import React from 'react';
import style from './UploadPhoto.module.css';
import CloseIcon from '@material-ui/icons/Close';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const UploadPhoto = (props) => {
    return (
        <div className={style.uploadBlock}>
            <div>
                <label htmlFor="file">
                    <AddAPhotoIcon className={style.upload} style={{ fontSize: 50 }}/>
                </label>
                <input type="file" name="file" id="file" onChange={props.uploadImage} className={style.input}/>
                <div>Загрузить фото</div>
            </div>
            <div className={style.image}>
                {props.url ? <div>
                    <img className={style.avatar} src={`${props.url}`} alt="картинка"/>
                    <CloseIcon className={style.closeIcon} onClick={props.deleteUrl}/>
                </div> : ''}
            </div>
        </div>
    );
};

export default UploadPhoto

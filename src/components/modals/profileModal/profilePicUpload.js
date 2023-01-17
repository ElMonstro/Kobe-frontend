import React from "react";
import { updateRoleURL } from "../../../services/urls";
import UploadButton from "../../common/uploadButton";
import uploadIcon from "../../../assets/uploadImageIcon.svg";
import defaultAvatar from "../../../assets/defaultAvatar.png";
import { connect } from "react-redux";
import { PATCH } from "../../../utils/constants";
import { setProfilePic } from "../../../redux/actions";
import { base_cloudinary_url } from "../../../services/baseURL";

const ProfilePicUpload = ({ userRole, setProfilePic }) => {

    const icon = () => <div className="upload_icon"><img alt="upload" src={ uploadIcon } /></div>
    const profile_pic_url = userRole?.profile_pic? base_cloudinary_url + userRole.profile_pic: defaultAvatar;

    return (
        <div className="profile_pic_cont">
            <div className="profile_title">Your Profile</div>
            <div className="profile_pic">
                <img alt="avatar" src={ profile_pic_url } />
                <div className="name">{ userRole?.user?.first_name } { userRole?.user?.second_name }</div>
                <div className="position">{ userRole?.name }</div>
            </div>
            
            <div className="profile_btn">
                <UploadButton 
                    uploadURL={ updateRoleURL }
                    ClickElement={ icon }
                    className="edit_icon"
                    fileKey="profile_pic"
                    method={ PATCH }
                    handleRequestResult={ setProfilePic }
                /> 
            </div>
            <div className="instructions">
                Picture must be 600 by 600
             </div>
        </div>
    );
};

const mapDispatchToProps = {
    setProfilePic
}

const mapStateToProps = ({ adminReducer: { orgChart } } ) => ({
    userRole: orgChart[0]
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (ProfilePicUpload);

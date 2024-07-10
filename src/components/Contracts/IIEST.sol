// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VideoShare {
    struct Video {
        string videoHash;
        address uploader;
        string fileName;
        string description;
    }

    Video[] public videos;
    mapping(address => Video[]) public userVideos;

    event VideoUploaded(
        string videoHash,
        address uploader,
        string fileName,
        string description
    );

    function uploadVideo(string memory _videoHash,address account,string memory filename,string memory description) public {
        Video memory newVideo = Video(_videoHash,  account,filename,description);
        videos.push(newVideo);
        userVideos[msg.sender].push(newVideo);

        emit VideoUploaded(_videoHash,account,filename,description);
    }

    function getUserVideos(address user) public view returns (Video[] memory) {
        return userVideos[user];
    }

    function getAllVideos() public view returns (Video[] memory) {
        return videos;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VideoShare {
    struct Video {
        string videoHash;
        address uploader;
        string fileName;
        string description;
        uint256 time;
        string genre;
        uint256 reports; // Count of reports
        uint256 reviews; // Count of reviews
        bool reviewed;   // Whether the video is under review
    }

    Video[] public videos;
    mapping(address => Video[]) public userVideos;
    mapping(address => string[]) public userReportedVideos; // Videos reported by a user
    mapping(address => string[]) public userReviewVideos;   // Videos marked for review by a user

    event VideoUploaded(
        string videoHash,
        address uploader,
        string fileName,
        string description,
        uint256 time,
        string genre
    );

    event VideoReported(
        address reporter,
        string videoHash,
        string reason
    );

    event VideoMarkedForReview(
        address reviewer,
        string videoHash,
        string reason
    );

    function uploadVideo(
        string memory _videoHash,
        address account,
        string memory filename,
        string memory description,
        uint256 tim,
        string memory gen
    ) public {
        Video memory newVideo = Video(
            _videoHash,
            account,
            filename,
            description,
            tim,
            gen,
            0, // reports
            0, // reviews
            false // reviewed
        );
        videos.push(newVideo);
        userVideos[msg.sender].push(newVideo);

        emit VideoUploaded(_videoHash, account, filename, description, tim, gen);
    }

    function reportVideo(string memory videoHash, string memory reason) public {
        bool found = false;
        for (uint256 i = 0; i < videos.length; i++) {
            if (keccak256(bytes(videos[i].videoHash)) == keccak256(bytes(videoHash))) {
                videos[i].reports += 1;
                userReportedVideos[msg.sender].push(videoHash);
                found = true;
                emit VideoReported(msg.sender, videoHash, reason);
                break;
            }
        }
        require(found, "Video not found");
    }

    function markVideoForReview(string memory videoHash, string memory reason) public {
        bool found = false;
        for (uint256 i = 0; i < videos.length; i++) {
            if (keccak256(bytes(videos[i].videoHash)) == keccak256(bytes(videoHash))) {
                videos[i].reviews += 1;
                videos[i].reviewed = true;
                userReviewVideos[msg.sender].push(videoHash);
                found = true;
                emit VideoMarkedForReview(msg.sender, videoHash, reason);
                break;
            }
        }
        require(found, "Video not found");
    }

    function getUserReportedVideos(address user) public view returns (string[] memory) {
        return userReportedVideos[user];
    }

    function getAllReportedVideos() public view returns (Video[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < videos.length; i++) {
            if (videos[i].reports > 0) {
                count++;
            }
        }

        Video[] memory reportedVideos = new Video[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < videos.length; i++) {
            if (videos[i].reports > 0) {
                reportedVideos[index] = videos[i];
                index++;
            }
        }
        return reportedVideos;
    }

    function getUserReviewVideos(address user) public view returns (string[] memory) {
        return userReviewVideos[user];
    }

    function getVideosToReview(address reviewer) public view returns (Video[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < videos.length; i++) {
            if (videos[i].reviewed) {
                for (uint256 j = 0; j < userReviewVideos[reviewer].length; j++) {
                    if (keccak256(bytes(videos[i].videoHash)) == keccak256(bytes(userReviewVideos[reviewer][j]))) {
                        count++;
                    }
                }
            }
        }

        Video[] memory reviewVideos = new Video[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < videos.length; i++) {
            if (videos[i].reviewed) {
                for (uint256 j = 0; j < userReviewVideos[reviewer].length; j++) {
                    if (keccak256(bytes(videos[i].videoHash)) == keccak256(bytes(userReviewVideos[reviewer][j]))) {
                        reviewVideos[index] = videos[i];
                        index++;
                    }
                }
            }
        }
        return reviewVideos;
    }

    // Keep the original functions to see videos
    function getAllVideos() public view returns (Video[] memory) {
        return videos;
    }

    function getUserVideos(address user) public view returns (Video[] memory) {
        return userVideos[user];
    }
}

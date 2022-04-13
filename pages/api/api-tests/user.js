export const currentUser = {
    id: 5,
    userName: 'ben_sven_ten',
    name: 'Ben Shekhtman',
    bio: 'currently away from keyboard',
    userAvatar: 'https://media.wired.com/photos/5926dc8ecfe0d93c474319dd/master/pass/PikachuTA-EWEATA.jpg',
    posts: [
        {
            postId: 1,
            postContent: 'https://preview.redd.it/y9ywctsomxd81.jpg?width=640&crop=smart&auto=webp&s=1fc5128ea738a6955cca49f87dee26e46ca4e689',
            postDescription: 'post 1',
            postedOn: '2022-04-10T02:09:00',
            postedBy: {
                userId: 5,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.wired.com/photos/5926dc8ecfe0d93c474319dd/master/pass/PikachuTA-EWEATA.jpg'
            },
            likedBy: [
                {
                    id: 1,
                    likedPostId: 1,
                    userId: 3,
                    userName: 'nance-202',
                    name: 'nancy jones',
                    userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
                },
                {
                    id: 2,
                    likedPostId: 1,
                    userId: 6,
                    userName: 'ben_sven_ten',
                    name: 'Ben Shektman',
                    userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
                },
            ],
            comments: [
                {
                    id: 1,
                    commentForPostId: 1,
                    commentId: 1,
                    userId: 10,
                    userName: 'dvox',
                    userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309',
                    comment: 'SICK!',
                    commentedOn: '2022-04-10T02:09:00',
                }
            ]
        },
        {
            postId: 2,
            postContent: 'https://4.bp.blogspot.com/-gntUZhd7hvY/XJZrPKxkdcI/AAAAAAAAbJo/Z2GXj1h81YUDdhIYuTr6nzJ4drxD5QjUwCLcBGAs/s1600/IMG_2717.jpg',
            postDescription: 'post 2',
            postedOn: '2022-04-10T02:09:00',
            postedBy: {
                userId: 5,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.wired.com/photos/5926dc8ecfe0d93c474319dd/master/pass/PikachuTA-EWEATA.jpg'
            },
            likedBy: [
                {
                    id: 1,
                    likedPostId: 1,
                    userId: 3,
                    userName: 'nance-202',
                    name: 'nancy jones',
                    userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
                },
                {
                    id: 2,
                    likedPostId: 1,
                    userId: 6,
                    userName: 'ben_sven_ten',
                    name: 'Ben Shektman',
                    userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
                },
            ],
            comments: [
                {
                    id: 1,
                    commentForPostId: 1,
                    commentId: 1,
                    userId: 10,
                    userName: 'dvox',
                    userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309',
                    comment: 'SICK!',
                    commentedOn: '2022-04-10T02:09:00',
                }
            ]
        },
        {
            postId: 3,
            postContent: 'https://images.squarespace-cdn.com/content/v1/5db5e6869c82027d2d5c809a/1615035210560-XLQ9583MCVC65Z1D5GRX/925DAC4C-5A90-447A-8C83-3D9CF52E2F31_1_201_a.jpg?format=1000w',
            postDescription: 'post 3',
            postedOn: '2022-04-10T02:09:00',
            postedBy: {
                userId: 5,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.wired.com/photos/5926dc8ecfe0d93c474319dd/master/pass/PikachuTA-EWEATA.jpg'
            },
            likedBy: [
                {
                    id: 1,
                    likedPostId: 1,
                    userId: 3,
                    userName: 'nance-202',
                    name: 'nancy jones',
                    userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
                },
                {
                    id: 2,
                    likedPostId: 1,
                    userId: 6,
                    userName: 'ben_sven_ten',
                    name: 'Ben Shektman',
                    userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
                },
            ],
            comments: [
                {
                    id: 1,
                    commentForPostId: 1,
                    commentId: 1,
                    userId: 10,
                    userName: 'dvox',
                    userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309',
                    comment: 'SICK!',
                    commentedOn: '2022-04-10T02:09:00',
                }
            ]
        },
        {
            postId: 2,
            postContent: 'https://4.bp.blogspot.com/-gntUZhd7hvY/XJZrPKxkdcI/AAAAAAAAbJo/Z2GXj1h81YUDdhIYuTr6nzJ4drxD5QjUwCLcBGAs/s1600/IMG_2717.jpg',
            postDescription: 'post 2',
            postedOn: '2022-04-10T02:09:00',
            postedBy: {
                userId: 5,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.wired.com/photos/5926dc8ecfe0d93c474319dd/master/pass/PikachuTA-EWEATA.jpg'
            },
            likedBy: [
                {
                    id: 1,
                    likedPostId: 1,
                    userId: 3,
                    userName: 'nance-202',
                    name: 'nancy jones',
                    userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
                },
                {
                    id: 2,
                    likedPostId: 1,
                    userId: 6,
                    userName: 'ben_sven_ten',
                    name: 'Ben Shektman',
                    userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
                },
            ],
            comments: [
                {
                    id: 1,
                    commentForPostId: 1,
                    commentId: 1,
                    userId: 10,
                    userName: 'dvox',
                    userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309',
                    comment: 'SICK!',
                    commentedOn: '2022-04-10T02:09:00',
                }
            ]
        },
        {
            postId: 3,
            postContent: 'https://images.squarespace-cdn.com/content/v1/5db5e6869c82027d2d5c809a/1615035210560-XLQ9583MCVC65Z1D5GRX/925DAC4C-5A90-447A-8C83-3D9CF52E2F31_1_201_a.jpg?format=1000w',
            postDescription: 'post 3',
            postedOn: '2022-04-10T02:09:00',
            postedBy: {
                userId: 5,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.wired.com/photos/5926dc8ecfe0d93c474319dd/master/pass/PikachuTA-EWEATA.jpg'
            },
            likedBy: [
                {
                    id: 1,
                    likedPostId: 1,
                    userId: 3,
                    userName: 'nance-202',
                    name: 'nancy jones',
                    userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
                },
                {
                    id: 2,
                    likedPostId: 1,
                    userId: 6,
                    userName: 'ben_sven_ten',
                    name: 'Ben Shektman',
                    userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
                },
            ],
            comments: [
                {
                    id: 1,
                    commentForPostId: 1,
                    commentId: 1,
                    userId: 10,
                    userName: 'dvox',
                    userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309',
                    comment: 'SICK!',
                    commentedOn: '2022-04-10T02:09:00',
                }
            ]
        },
    ]
}
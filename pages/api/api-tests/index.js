// simulate api return for posts

export const posts = [
    {
        id: 1,
        postContent: 'https://blog.theclymb.com/wp-content/uploads/2015/03/Selfie.jpg',
        postDescription: 'My first post! ya ya ya ya ya ya ya ya ya ya ya',
        postedBy: {
            userId: 1,
            userName: 'John-Wils',
            userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
        },
        postedOn: '2022-04-10T02:09:00',
        likedBy: [
            {
                id: 1,
                likedPostId: 1,
                userId: 3,
                userName: 'nance-202',
                userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
            },
            {
                id: 2,
                likedPostId: 1,
                userId: 6,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
            },
            {
                id: 3,
                likedPostId: 1,
                userId: 10,
                userName: 'dvox',
                userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309'
            },
            {
                id: 4,
                likedPostId: 1,
                userId: 1,
                userName: 'John-Wils',
                userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
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
        id: 2,
        postContent: 'https://blog.theclymb.com/wp-content/uploads/2015/03/Selfie.jpg',
        postDescription: 'My first post! ya ya ya ya ya ya ya ya ya ya ya',
        postedBy: {
            userId: 1,
            userName: 'John-Wils',
            userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
        },
        postedOn: '2022-04-10T02:09:00',
        likedBy: [
            {
                id: 1,
                likedPostId: 1,
                userId: 3,
                userName: 'nance-202',
                userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
            },
            {
                id: 2,
                likedPostId: 1,
                userId: 6,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
            },
            {
                id: 3,
                likedPostId: 1,
                userId: 10,
                userName: 'dvox',
                userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309'
            },
            {
                id: 4,
                likedPostId: 1,
                userId: 1,
                userName: 'John-Wils',
                userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
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
            },
            {
                id: 2,
                commentForPostId: 1,
                commentId: 2,
                userId: 4,
                userName: 'johnson-n-monson',
                userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHNob3R8ZW58MHx8MHx8&w=1000&q=80',
                comment: 'i lovve this!!!',
                commentedOn: '2022-04-10T02:09:00',
            },
        ]
    },
    {
        id: 3,
        postContent: 'https://blog.theclymb.com/wp-content/uploads/2015/03/Selfie.jpg',
        postDescription: 'My first post! ya ya ya ya ya ya ya ya ya ya ya',
        postedBy: {
            userId: 1,
            userName: 'John-Wils',
            userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
        },
        postedOn: '2022-04-10T02:09:00',
        likedBy: [
            {
                id: 1,
                likedPostId: 1,
                userId: 3,
                userName: 'nance-202',
                userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
            },
            {
                id: 2,
                likedPostId: 1,
                userId: 6,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
            },
            {
                id: 3,
                likedPostId: 1,
                userId: 10,
                userName: 'dvox',
                userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309'
            },
            {
                id: 4,
                likedPostId: 1,
                userId: 1,
                userName: 'John-Wils',
                userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
            },
        ],
        comments: []
    },
    {
        id: 4,
        postContent: 'https://blog.theclymb.com/wp-content/uploads/2015/03/Selfie.jpg',
        postDescription: 'My first post! ya ya ya ya ya ya ya ya ya ya ya',
        postedBy: {
            userId: 1,
            userName: 'John-Wils',
            userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
        },
        postedOn: '2022-04-10T02:09:00',
        likedBy: [
            {
                id: 1,
                likedPostId: 1,
                userId: 3,
                userName: 'nance-202',
                userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
            },
            {
                id: 2,
                likedPostId: 1,
                userId: 6,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
            },
            {
                id: 3,
                likedPostId: 1,
                userId: 10,
                userName: 'dvox',
                userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309'
            },
            {
                id: 4,
                likedPostId: 1,
                userId: 1,
                userName: 'John-Wils',
                userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
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
            },
            {
                id: 2,
                commentForPostId: 1,
                commentId: 2,
                userId: 4,
                userName: 'johnson-n-monson',
                userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHNob3R8ZW58MHx8MHx8&w=1000&q=80',
                comment: 'i lovve this!!!',
                commentedOn: '2022-04-10T02:09:00',
            },
        ]
    },
    {
        id: 5,
        postContent: 'https://blog.theclymb.com/wp-content/uploads/2015/03/Selfie.jpg',
        postDescription: 'My first post! ya ya ya ya ya ya ya ya ya ya ya',
        postedBy: {
            userId: 1,
            userName: 'John-Wils',
            userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
        },
        postedOn: '2022-04-10T02:09:00',
        likedBy: [
            {
                id: 1,
                likedPostId: 1,
                userId: 3,
                userName: 'nance-202',
                userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
            },
            {
                id: 2,
                likedPostId: 1,
                userId: 6,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
            },
            {
                id: 3,
                likedPostId: 1,
                userId: 10,
                userName: 'dvox',
                userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309'
            },
            {
                id: 4,
                likedPostId: 1,
                userId: 1,
                userName: 'John-Wils',
                userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
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
            },
            {
                id: 2,
                commentForPostId: 1,
                commentId: 2,
                userId: 4,
                userName: 'johnson-n-monson',
                userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHNob3R8ZW58MHx8MHx8&w=1000&q=80',
                comment: 'i lovve this!!!',
                commentedOn: '2022-04-10T02:09:00',
            },
        ]
    },
    {
        id: 6,
        postContent: 'https://blog.theclymb.com/wp-content/uploads/2015/03/Selfie.jpg',
        postDescription: 'My first post! ya ya ya ya ya ya ya ya ya ya ya',
        postedBy: {
            userId: 1,
            userName: 'John-Wils',
            userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
        },
        postedOn: '2022-04-10T02:09:00',
        likedBy: [
            {
                id: 1,
                likedPostId: 1,
                userId: 3,
                userName: 'nance-202',
                userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
            },
            {
                id: 2,
                likedPostId: 1,
                userId: 6,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
            },
            {
                id: 3,
                likedPostId: 1,
                userId: 10,
                userName: 'dvox',
                userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309'
            },
            {
                id: 4,
                likedPostId: 1,
                userId: 1,
                userName: 'John-Wils',
                userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
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
            },
            {
                id: 2,
                commentForPostId: 1,
                commentId: 2,
                userId: 4,
                userName: 'johnson-n-monson',
                userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHNob3R8ZW58MHx8MHx8&w=1000&q=80',
                comment: 'i lovve this!!!',
                commentedOn: '2022-04-10T02:09:00',
            },
        ]
    },
    {
        id: 7,
        postContent: 'https://blog.theclymb.com/wp-content/uploads/2015/03/Selfie.jpg',
        postDescription: 'My first post! ya ya ya ya ya ya ya ya ya ya ya',
        postedBy: {
            userId: 1,
            userName: 'John-Wils',
            userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
        },
        postedOn: '2022-04-10T02:09:00',
        likedBy: [
            {
                id: 1,
                likedPostId: 1,
                userId: 3,
                userName: 'nance-202',
                userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
            },
            {
                id: 2,
                likedPostId: 1,
                userId: 6,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
            },
            {
                id: 3,
                likedPostId: 1,
                userId: 10,
                userName: 'dvox',
                userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309'
            },
            {
                id: 4,
                likedPostId: 1,
                userId: 1,
                userName: 'John-Wils',
                userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
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
            },
            {
                id: 2,
                commentForPostId: 1,
                commentId: 2,
                userId: 4,
                userName: 'johnson-n-monson',
                userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHNob3R8ZW58MHx8MHx8&w=1000&q=80',
                comment: 'i lovve this!!!',
                commentedOn: '2022-04-10T02:09:00',
            },
        ]
    },
    {
        id: 8,
        postContent: 'https://blog.theclymb.com/wp-content/uploads/2015/03/Selfie.jpg',
        postDescription: 'My first post! ya ya ya ya ya ya ya ya ya ya ya',
        postedBy: {
            userId: 1,
            userName: 'John-Wils',
            userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
        },
        postedOn: '2022-04-10T02:09:00',
        likedBy: [
            {
                id: 1,
                likedPostId: 1,
                userId: 3,
                userName: 'nance-202',
                userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
            },
            {
                id: 2,
                likedPostId: 1,
                userId: 6,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
            },
            {
                id: 3,
                likedPostId: 1,
                userId: 10,
                userName: 'dvox',
                userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309'
            },
            {
                id: 4,
                likedPostId: 1,
                userId: 1,
                userName: 'John-Wils',
                userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
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
            },
            {
                id: 2,
                commentForPostId: 1,
                commentId: 2,
                userId: 4,
                userName: 'johnson-n-monson',
                userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHNob3R8ZW58MHx8MHx8&w=1000&q=80',
                comment: 'i lovve this!!!',
                commentedOn: '2022-04-10T02:09:00',
            },
        ]
    },
    {
        id: 9,
        postContent: 'https://blog.theclymb.com/wp-content/uploads/2015/03/Selfie.jpg',
        postDescription: 'My first post! ya ya ya ya ya ya ya ya ya ya ya',
        postedBy: {
            userId: 1,
            userName: 'John-Wils',
            userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
        },
        postedOn: '2022-04-10T02:09:00',
        likedBy: [
            {
                id: 1,
                likedPostId: 1,
                userId: 3,
                userName: 'nance-202',
                userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
            },
            {
                id: 2,
                likedPostId: 1,
                userId: 6,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
            },
            {
                id: 3,
                likedPostId: 1,
                userId: 10,
                userName: 'dvox',
                userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309'
            },
            {
                id: 4,
                likedPostId: 1,
                userId: 1,
                userName: 'John-Wils',
                userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
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
            },
            {
                id: 2,
                commentForPostId: 1,
                commentId: 2,
                userId: 4,
                userName: 'johnson-n-monson',
                userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHNob3R8ZW58MHx8MHx8&w=1000&q=80',
                comment: 'i lovve this!!!',
                commentedOn: '2022-04-10T02:09:00',
            },
        ]
    },
    {
        id: 10,
        postContent: 'https://blog.theclymb.com/wp-content/uploads/2015/03/Selfie.jpg',
        postDescription: 'My first post! ya ya ya ya ya ya ya ya ya ya ya',
        postedBy: {
            userId: 1,
            userName: 'John-Wils',
            userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
        },
        postedOn: '2022-04-10T02:09:00',
        likedBy: [
            {
                id: 1,
                likedPostId: 1,
                userId: 3,
                userName: 'nance-202',
                userAvatar: 'https://images.squarespace-cdn.com/content/v1/5de44773e21f980cc58b7c04/1642552115327-DJ09OLU46KXX5W1CE09U/BusinesHeadshot'
            },
            {
                id: 2,
                likedPostId: 1,
                userId: 6,
                userName: 'ben_sven_ten',
                userAvatar: 'https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?b=1&k=20&m=1288538088&s=170667a&w=0&h=3efMku7kSXUhpVrErAVVgxp6G91tRZ_5seygOn68RnE='
            },
            {
                id: 3,
                likedPostId: 1,
                userId: 10,
                userName: 'dvox',
                userAvatar: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=309'
            },
            {
                id: 4,
                likedPostId: 1,
                userId: 1,
                userName: 'John-Wils',
                userAvatar: 'https://ih0.redbubble.net/image.149118848.9552/flat,800x800,075,f.jpg'
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
            },
            {
                id: 2,
                commentForPostId: 1,
                commentId: 2,
                userId: 4,
                userName: 'johnson-n-monson',
                userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHNob3R8ZW58MHx8MHx8&w=1000&q=80',
                comment: 'i lovve this!!!',
                commentedOn: '2022-04-10T02:09:00',
            },
        ]
    },
]
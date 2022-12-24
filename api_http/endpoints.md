# Api endpoints

---

## Add array of videos to db

- `POST /videos`

With following body:

```
{
    videos: [video1, video2 ...]
}
```

Where video1 and video2 are such objects:

```
{
    isRu: 0 || 1
    uid: String,
    channelName: String,
    link: String,
    reason: String,
    reasonDetails: String,
    timeWhenBlocked: Number,
    title: String
}
```

## Get all videos from db

- `GET /videos`

or

- `GET /videos?page=pageNumber&limit=limit` for pagination




















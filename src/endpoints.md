# Api endpoints

---

## Add array of videos to db

- `POST /addruvideos`

or

- `POST /addnotruvideos`

With following body:

```
{
    videos: [video1, video2 ...]
}
```

Where video1 and video2 are such objects:

```
{
    uid: String    (required),
    channelName: String,
    link: String    (required),
    reason: String     (required),
    reasonDetails: String,
    timeWhenBlocked: Number    (required),
    title: String     (requried)
}
```


















const express = require('express')
const router = express().router()
const fs = require('fs')
const torrentStream = require('torrent-stream')
var magnet_Link= require('magnet-link')

const getMagLink = (uri) => {
    return new Promise((resolve, reject) => {
        magnet_Link(uri , function(err, link){
            if (err) reject(err);
            resolve(link);
        })
    })
}
router.get('/stream', async (req, res) => {
    var apiurl =`https://yts.mx/torrent/download/8D06D8AF48591271F3BD523437078CB6B0039B19`
    let mag 
    try {
        mag = await getMagLink(apiurl);
        console.log(mag)
    
    } catch (error) {
        console.log(error);
    }
   
    console.log('mag', mag);
    var url = encodeURI(apiurl)
    console.log('url ',url );
    let trackers = ''
    let track = ['udp://open.demonii.com:1337/announce', 
    'udp://tracker.openbittorrent.com:80',
    'udp://tracker.coppersurfer.tk:6969', 
    'udp://glotorrents.pw:6969/announce']
    for (let i in track) {
        let uri = encodeURI(track[i])
        console.log('uro', uri);
        trackers += `&tr=${uri}`
    }
    console.log('trackers', trackers);
    let magnet =`${mag}&dn${url}${trackers}`
    console.log('magnet', magnet)

    const magnetLink = magnet
    const options = {
        connections: 100,
        uploads: 10,
        path: './uploads/',
        verify: true,
        dht: true,
        tracker: true,
        trackers: [
            'udp://tracker.openbittorrent.com:80',
            'udp://tracker.ccc.de:80'
        ],
    }

    const engine = torrentStream(magnetLink, options)
    engine.on('ready', function() {
        const file = engine.files[0]
        console.log(file.length)
        const fileSize = file.length
        const range = req.headers.range
        
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1
            const chunksize = (end - start) + 1
            const stream = file.createReadStream({start, end})
            const head = {
                'Content-Range': `bytes ${start} - ${end} / ${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head)
            stream.pipe(res)
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            file.createReadStream().pipe(res)
        }

    })
})
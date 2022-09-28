---
title: "Test av Safespring live"
date: 2019-01-07T13:58:58+01:00
draft: false
section: "Kubernetes"
intro: "Genom RTMP kan vi sända live till vår egen webbplats."
background: "safespring_background_medtech2.svg"
card: "safespring-kubernetes.svg"
socialmedia: "safespring_social_01.jpg"
sidebarlinkname: "Boka demo"
sidebarlinkurl: "/demo"
sidebarsection: "Medtech"
sidebarimage: "safespring-kubernetes.svg"
sidebartitle: ""
sidebartext: ""
sidebardate: ""
sidebarknapp: ""
sidebarlink: ""
darkmode: "off"
saas: ""
sidebarwhitepaper: ""
aliases:
---

{{< ingress >}}
Video-feed:en är länkad till en vanligt video-tagg och publicerad på en standardsida. Kontakta Marcus eller Gabriel vid frågor.
{{</ ingress >}}

<video class="youtube" src="https://rtmp.safedc.services/obs_stream.m3u8" type="application/x-mpegURL"></video>




<video id='hls-example'  class="video-js vjs-default-skin" width="400" height="300" controls>
<source type="application/x-mpegURL" src="https://rtmp.safedc.services/obs_stream.m3u8">
</video>
<script src="https://vjs.zencdn.net/ie8/ie8-version/videojs-ie8.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.14.1/videojs-contrib-hls.js"></script>
<script src="https://vjs.zencdn.net/7.2.3/video.js"></script>
<script>
var player = videojs('hls-example');
player.play();
</script>

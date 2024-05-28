import { useEffect, useRef } from "react"

const Main= ()=>{

    const videoRef= useRef()

    // 모바일 웹 브라우저에서도 잘됨. 안드로이드 웹뷰에서만 동작하면 동영상 촬영을 이용한 웹앱도 제작할 수 있을 듯.
    const clickStart= ()=>{
        //https가 아니면 mediaDevices에 대한 사용이 불가능. [ github page 를 이용한 배포. or AWS or Dothome 유료. ] 
        navigator.mediaDevices.getUserMedia({audio:true, video:true})
        .then(stream=>{
            videoRef.current.srcObject = stream
        })
        .catch(error=>alert(error.message))

        // http에서도 되게 하려면. 크롬브라우저 설정 사이트인. chrome://flags/#unsafely-treat-insecure-origin-as-secure 에서 http dothome 사이트 등록.
    }

    //화면에 보여지면 곧바로 웹캠 시작
    //useEffect( clickStart, [] )

    const clickStop= ()=>{
        videoRef.current.srcObject.getTracks().forEach(track=>track.stop())
    }

    return (
        <div style={{padding:16,}}>
            <h1>webcam test</h1>

            <video autoPlay ref={videoRef} style={{width:'100%', maxWidth:400, border:'solid', backgroundColor:'black', borderRadius:16}}></video>
            <br></br>
            <button onClick={clickStart}>start video</button> 
            &nbsp;
            <button onClick={clickStop}>stop video</button>

        </div>

    )
}
export default Main
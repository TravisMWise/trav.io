// makes playing audio return a promise
export async function playAudio(audio){
    const sound = await new Promise(res=>{
        audio.play()
        audio.onended = res
        audio.currentTime = 0;
    });
    return sound;
}
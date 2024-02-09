export function getFileFromUrl(downloadUrl){
    // remove front of the url string
    const baseURL = `https://firebasestorage.googleapis.com/v0/b/${import.meta.env.VITE_STORAGE_BUCKET_URL}/o/`;
    let fileGlob = downloadUrl.replace(baseURL, "")

    // remove end of url string
    const indexOfEndPath = fileGlob.indexOf("?");
    fileGlob = fileGlob.substring(0, indexOfEndPath);

    // retufn existing file glob
    console.log(`generated file glob: ${fileGlob}`)
    return fileGlob;
}
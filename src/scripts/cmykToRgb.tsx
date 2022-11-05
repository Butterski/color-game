// https://stackoverflow.com/questions/8869248/use-cmyk-on-web-page
function cmyk2rgb(c: number,m: number,y: number,k: number) {

    function padZero(str: string) {
        return "000000".substr(str.length)+str
    }

    var cyan = (c * 255 * (1-k)) << 16;
    var magenta = (m * 255 * (1-k)) << 8;
    var yellow = (y * 255 * (1-k)) >> 0;

    var black = 255 * (1-k);
    var white = black | (black << 8) | (black << 16);

    var color = white - (cyan | magenta | yellow );

    return ("#"+padZero(color.toString(16)));


}

export function cmykToHex(cmyk: any){
    const thingsToRemove = ['cmyk', '%', '(', ')']
    for(let i=0; i<thingsToRemove.length; i++){
        cmyk = cmyk.replace(thingsToRemove[i], '')
    }
    cmyk = cmyk.split("%").join("").split(',');
    return cmyk2rgb(parseInt(cmyk[0]), parseInt(cmyk[1]), parseInt(cmyk[2]), parseInt(cmyk[3]))
}
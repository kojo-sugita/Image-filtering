
/*
 * コンストラクタ
 */
function IplImage(_context, _image, _imageData, _channels) {
    this.width = _image.width;
    this.height = _image.height;
    this.imageLength = _image.width * _image.height;
    this.channels = _channels;

    this.context = _context;
    this.image = _image;
    this.imageData = _imageData;
    this.data = _imageData.data;
    this.length = _imageData.data.length;
}

/*
 * 初期化
 */
IplImage.prototype.initialize = function(val) {
    for (var i = 0; i < this.length; i += 4) {
        this.data[i] = val;
        this.data[i + 1] = val;
        this.data[i + 2] = val;
    }
}

/*
 * 輝度値を取得する
 */
IplImage.prototype.getPixel = function(x, y) {
    var pixelArray = new Array(this.channels);

    for ( i = 0; i < this.channels; i++ ) {
        pixelArray[i] = this.data[(y * this.width + x) * 4 + i];
    }

    switch ( this.channels ) {
        case 1: //グレースケール
            return pixelArray[0];
            break;

        case 3: //カラー画像
            return {R:pixelArray[0], G:pixelArray[1], B:pixelArray[2]};
            break;

        case 4: //カラー画像 + αチャンネル
            return {R:pixelArray[0], G:pixelArray[1], B:pixelArray[2], A:pixelArray[3]};
            break;

        default:
            return 0;
            break;
    }
}

/*
 * 輝度値を取得する
 */
IplImage.prototype.getArrayPixel = function(index) {
    var pixelArray = new Array(this.channels);
    var newIndex = Math.floor(index * this.channels);

    for ( i = 0; i < this.channels; i++ ) {
        pixelArray[i] = this.data[newIndex + i];
    }

    switch ( this.channels ) {
        case 1: //グレースケール
            return pixelArray[0];
            break;

        case 3: //カラー画像
            return {R:pixelArray[0], G:pixelArray[1], B:pixelArray[2]};
            break;

        case 4: //カラー画像 + αチャンネル
            return {R:pixelArray[0], G:pixelArray[1], B:pixelArray[2], A:pixelArray[3]};
            break;

        default:
            return 0;
            break;
    }
}

/*
 * 輝度値を設定する
 */
IplImage.prototype.setPixel = function() {
    if ( arguments.length <= 2 ) {
        return;
    }

    var x = arguments[0];
    var y = arguments[1];

    switch ( this.channels ) {
        case 1:
            this.data[(y * this.width + x) * 4] = arguments[2];
            this.data[(y * this.width + x) * 4 + 1] = arguments[2];
            this.data[(y * this.width + x) * 4 + 2] = arguments[2];
            break;

        case 3:
            this.data[(y * this.width + x) * 4] = arguments[2];
            this.data[(y * this.width + x) * 4 + 1] = arguments[3];
            this.data[(y * this.width + x) * 4 + 2] = arguments[4];
            break;

        case 4:
            this.data[(y * this.width + x) * 4] = arguments[2];
            this.data[(y * this.width + x) * 4 + 1] = arguments[3];
            this.data[(y * this.width + x) * 4 + 2] = arguments[4];
            this.data[(y * this.width + x) * 4 + 3] = arguments[5];
            break;
    }

}

/*
 * 輝度値を設定する
 */
IplImage.prototype.setArrayPixel = function() {
    if ( arguments.length <= 1 ) {
        return;
    }

    var index = arguments[0] * 4;

    switch ( this.channels ) {
        case 1:
            this.data[i] = arguments[1];
            this.data[i + 1] = arguments[1];
            this.data[i + 2] = arguments[1];
            break;

        case 3:
            this.data[i] = arguments[1];
            this.data[i + 1] = arguments[2];
            this.data[i + 2] = arguments[3];
            break;

        case 4:
            this.data[i] = arguments[1];
            this.data[i + 1] = arguments[2];
            this.data[i + 2] = arguments[3];
            this.data[i + 3] = arguments[4];
            break;
    }

}

/*
 * コピー
 */
IplImage.prototype.copy = function() {
    var temp = this.context.createImageData(this.width, this.height);

    // 編集用の画像を作成
    var dst = new IplImage(this.context, this.image, temp, this.channels);

    for ( var i = 0; i < this.length; i++ ) {
        dst.data[i] = this.data[i];
    }

    return dst;

}


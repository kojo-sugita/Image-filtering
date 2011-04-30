
/*
 * コンストラクタ
 */
function EdgeDetector(grayImage) {
    this.src = grayImage;
}

/**
 * 空間フィルタリング
 * @param[in] filter フィルタ(一次元配列を想定)
 * @param[in] size_f フィルタのサイズ(3 x 3なら3と指定)
 */
EdgeDetector.prototype.spatialFiltering = function(filter, size_f) {
    var init = Math.floor(size_f / 2);
    var from = - init;
    var to = init;

    var result = this.src.copy();

    var sum;
    var total; // 正規化用フィルタ合計値
    var n, m;

    for (var y = 0; y < this.src.height; y++) {
        for (var x = 0; x < this.src.width; x++) {
            sum = 0;
            total = 0;

            // 端か?
            if ( x - init < 0 || x + init >= this.src.width
                    || y - init < 0 || y + init >= this.src.height ) { // yes

                /* フィルタリング */
                for (n = from ; n <= to; n++) {
                    for (m = from; m <= to; m++) {
                        if ( x + m < 0 || x + m >= this.src.width
                                || y + n < 0 || y + n >= this.src.height ) {
                            continue;
                        }

                        total += filter[(n + init) * size_f + m + init];
                        sum += this.src.getPixel(x + m, y + n) * filter[(n + init) * size_f + m + init];

                    }
                }

                if (total > 0) sum /= total;

            } else { // no
                /* フィルタリング */
                for (n = from; n <= to; n++) {
                    for (m = from; m <= to; m++) {
                        sum += this.src.getPixel(x + m, y + n) * filter[(n + init) * size_f + m + init];
                    }
                }
            }

            result.setPixel(x, y, Math.floor(Math.abs(sum)));
        }
    }

    return result;

}

/**
 * 3x3のプリューウィットフィルタ(横方向)を返す
 * @return プリューウィットフィルタ
 */
EdgeDetector.prototype.createPrewittFilterH = function() {
    /* Sobelフィルタ */
    var filter = new Array(
        -1, 0, 1,
        -1, 0, 1,
        -1, 0, 1
    );
    return filter;
}

/**
 * 3x3のプリューウィットフィルタ(縦方向)を返す
 * @return プリューウィットフィルタ
 */
EdgeDetector.prototype.createPrewittFilterV = function() {
    /* Sobelフィルタ */
    var filter = new Array(
        1, 1, 1,
        0, 0, 0,
        -1, -1, -1
    );
    return filter;
}

/**
 * 3x3のソーベルフィルタ(横方向)を返す
 * @return ソーベルフィルタ
 */
EdgeDetector.prototype.createSobelFilterH = function() {
    /* Sobelフィルタ */
    var filter = new Array(
        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1
    );
    return filter;
}

/**
 * 3x3のソーベルフィルタ(縦方向)を返す
 * @return ソーベルフィルタ
 */
EdgeDetector.prototype.createSobelFilterV = function() {
    /* Sobelフィルタ */
    var filter = new Array(
        1, 2, 1,
        0, 0, 0,
        -1, -2, -1
    );
    return filter;
}

/**
 * 3x3のラプラシアンフィルタを返す
 * @return ラプラシアンフィルタ
 */
EdgeDetector.prototype.createLaplacianFilter = function() {
    /* Sobelフィルタ */
    var filter = new Array(
        0, 1, 0,
        1, -4, 1,
        0, 1, 0
    );
    return filter;
}


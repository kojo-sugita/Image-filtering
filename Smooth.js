
/*
 * コンストラクタ
 */
function Smooth(colorImage) {
    this.src = colorImage;
}

/**
 * 空間フィルタリング
 * @param[in] filter フィルタ(一次元配列を想定)
 * @param[in] size_f フィルタのサイズ(3 x 3なら3と指定)
 * @return 空間フィルタリングを行った結果
 */
Smooth.prototype.spatialFiltering = function(filter, size_f) {
    var init = Math.floor(size_f / 2);
    var from = - init;
    var to = init;

    var result = this.src.copy();

    // 畳み込み結果
    var sumR, sumG, sumB;
    var absSumR, absSumG, absSumB;

    var total; // 正規化用フィルタ合計値
    var n, m;
    var pixel;

    for (var y = 0; y < this.src.height; y++) {
        for (var x = 0; x < this.src.width; x++) {
            sumR = sumG = sumB = 0.0;
            total = 0.0;

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

                        pixel = this.src.getPixel(x + m, y + n);
                        sumR += pixel.R * filter[(n + init) * size_f + m + init];
                        sumG += pixel.G * filter[(n + init) * size_f + m + init];
                        sumB += pixel.B * filter[(n + init) * size_f + m + init];
                    }
                }

                // 正規化
                sumR /= total;
                sumG /= total;
                sumB /= total;

            } else { // no
                /* フィルタリング */
                for (n = from; n <= to; n++) {
                    for (m = from; m <= to; m++) {
                        pixel = this.src.getPixel(x + m, y + n);

                        sumR += pixel.R * filter[(n + init) * size_f + m + init];
                        sumG += pixel.G * filter[(n + init) * size_f + m + init];
                        sumB += pixel.B * filter[(n + init) * size_f + m + init];

                    }
                }

            }

            absSumR = Math.floor(Math.abs(sumR));
            absSumG = Math.floor(Math.abs(sumG));
            absSumB = Math.floor(Math.abs(sumB));

            result.setPixel(x, y, absSumR, absSumG, absSumB);

        }
    }

    return result;
}

/**
 * 平均化フィルタを作成する
 * @param[in] size_f フィルタのサイズ(3 x 3なら3と指定)
 * @return 平均化フィルタ
 */
Smooth.prototype.createAveragingFilter = function(size_f) {
    var size = size_f * size_f;
    var filter = new Array(size);

    for ( var i = 0; i < size; i++ ) {
        filter[i] = 1.0 / size;
    }

    return filter;
}

/*
 * ガウシアンフィルタを作成する
 * @param[in] size_f フィルタのサイズ(3 x 3なら3と指定)
 * @param[in] sigma 分散
 * @return ガウシアンフィルタ
 */
Smooth.prototype.createGaussianFilter = function(size_f, sigma) {
    var init = Math.floor(size_f / 2);
    var k = 1.0 / Math.sqrt(2.0 * Math.PI) / sigma;

    var t = new Array(size_f);
    var total = 0.0;
    for (var i = 0; i < size_f; i++) {
        var x = i - init;
        t[i] = k / Math.exp( x * x / (2 * sigma * sigma) );
        total += t[i];
    }

    for (var j = 0; j < size_f; j++) t[j] /= total;

    var filter = new Array(size_f * size_f);
    for (var n = 0; n < size_f; n++) {
        for (var m = 0; m < size_f; m++) {
            filter[n * size_f + m] = t[n] * t[m];
        }
    }

    return filter;
}

/**
 * メディアンフィルタリングを行う
 * @param[in] size_f フィルタのサイズ(3 x 3なら3と指定)
 * @return メディアンフィルタの結果
 */
Smooth.prototype.medianFilltering = function(size_f) {
    var init = Math.floor(size_f / 2);
    var from = - init;
    var to = init;

    var result = this.src;

    var filterR = new Array(size_f * size_f);
    var filterG = new Array(size_f * size_f);
    var filterB = new Array(size_f * size_f);

    for (var y = init; y < this.src.height - init; y++) {
        for (var x = init; x < this.src.width - init; x++) {

            /* フィルタリング */
            for (var n = from; n <= to; n++) {
                for (var m = from; m <= to; m++) {
                    var pixel = this.src.getPixel(x + m, y + n);
                    filterR[(n + init) * size_f + m + init] = pixel.R;
                    filterG[(n + init) * size_f + m + init] = pixel.G;
                    filterB[(n + init) * size_f + m + init] = pixel.B;
                }
            }

            // 昇順にソート
            filterR.sort();
            filterG.sort();
            filterB.sort();

            var R = filterR[Math.floor((size_f * size_f) / 2)];
            var G = filterG[Math.floor((size_f * size_f) / 2)];
            var B = filterB[Math.floor((size_f * size_f) / 2)];

            result.setPixel(x, y, R, G, B);

        }
    }

    return result;
}


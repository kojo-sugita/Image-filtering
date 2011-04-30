
/*
 * 画像フィルタリング
 */
function ImageFiltering(image) {
    this.src = image;
}

/**
 * 空間フィルタリング
 * @param[in] filter フィルタ(一次元配列を想定)
 * @param[in] size_f フィルタのサイズ(3 x 3なら3と指定)
 * @return 空間フィルタリングを行った結果
 */
ImageFiltering.prototype.spatialFiltering = function(filter, size_f) {

    switch ( this.src.channels ) {
        case 1: // グレースケール
            return spatialFiltering_Gray(this.src);
            break;

        case 3: // カラー画像
            return spatialFiltering_Color(this.src);
            break;

        case 4: // カラー画像 + αチャンネル
            return spatialFiltering_Color(this.src);
            break;

        default: // その他(カラー画像とみなす)
            return spatialFiltering_Color(this.src);
            break;
    }

    /*
     * 空間フィルタリング(グレースケール)
     */
    function spatialFiltering_Gray(src) {
        var init = Math.floor(size_f / 2);
        var from = - init;
        var to = init;

        var result = src.copy();

        var sum, absSum;
        var total; // 正規化用フィルタ合計値
        var n, m;

        for (var y = 0; y < src.height; y++) {
            for (var x = 0; x < src.width; x++) {
                sum = 0;
                total = 0;

                // 端か?
                if ( x - init < 0 || x + init >= src.width
                        || y - init < 0 || y + init >= src.height ) { // yes

                    /* フィルタリング */
                    for (n = from ; n <= to; n++) {
                        for (m = from; m <= to; m++) {
                            if ( x + m < 0 || x + m >= src.width
                                    || y + n < 0 || y + n >= src.height ) {
                                continue;
                            }

                            total += filter[(n + init) * size_f + m + init];
                            sum += src.getPixel(x + m, y + n) * filter[(n + init) * size_f + m + init];

                        }
                    }

                    if (total > 0) sum /= total;

                } else { // no
                    /* フィルタリング */
                    for (n = from; n <= to; n++) {
                        for (m = from; m <= to; m++) {
                            sum += src.getPixel(x + m, y + n) * filter[(n + init) * size_f + m + init];
                        }
                    }

                }

                absSum = Math.floor(Math.abs(sum));
                if (absSum > 255) absSum = 255;
                result.setPixel(x, y, absSum);
            }
        }

        return result;

    }

    /*
     * 空間フィルタリング(カラー画像)
     */
    function spatialFiltering_Color(src) {
        var init = Math.floor(size_f / 2);
        var from = - init;
        var to = init;

        var result = src.copy();

        // 畳み込み結果
        var sumR, sumG, sumB;
        var absSumR, absSumG, absSumB;

        var total; // 正規化用フィルタ合計値
        var n, m;
        var pixel;

        for (var y = 0; y < src.height; y++) {
            for (var x = 0; x < src.width; x++) {
                sumR = sumG = sumB = 0.0;
                total = 0.0;

                // 端か?
                if ( x - init < 0 || x + init >= src.width
                        || y - init < 0 || y + init >= src.height ) { // yes

                    /* フィルタリング */
                    for (n = from ; n <= to; n++) {
                        for (m = from; m <= to; m++) {
                            if ( x + m < 0 || x + m >= src.width
                                    || y + n < 0 || y + n >= src.height ) {
                                continue;
                            }

                            total += filter[(n + init) * size_f + m + init];

                            pixel = src.getPixel(x + m, y + n);
                            sumR += pixel.R * filter[(n + init) * size_f + m + init];
                            sumG += pixel.G * filter[(n + init) * size_f + m + init];
                            sumB += pixel.B * filter[(n + init) * size_f + m + init];
                        }
                    }

                    // 正規化
                    if (total > 0) sumR /= total;
                    if (total > 0) sumG /= total;
                    if (total > 0) sumB /= total;

                } else { // no
                    /* フィルタリング */
                    for (n = from; n <= to; n++) {
                        for (m = from; m <= to; m++) {
                            pixel = src.getPixel(x + m, y + n);
                            sumR += pixel.R * filter[(n + init) * size_f + m + init];
                            sumG += pixel.G * filter[(n + init) * size_f + m + init];
                            sumB += pixel.B * filter[(n + init) * size_f + m + init];

                        }
                    }

                }

                absSumR = Math.floor(Math.abs(sumR));
                absSumG = Math.floor(Math.abs(sumG));
                absSumB = Math.floor(Math.abs(sumB));

                if (absSumR > 255) absSumR = 255;
                if (absSumG > 255) absSumG = 255;
                if (absSumB > 255) absSumB = 255;

                result.setPixel(x, y, absSumR, absSumG, absSumB);

            }
        }

        return result;
    }

}


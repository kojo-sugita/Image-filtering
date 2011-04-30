
/*
 * エッジ検出クラス
 */
function EdgeDetector(grayImage) {
    // コンストラクタチェーン
    ImageFiltering.call(this, grayImage);
}

EdgeDetector.prototype = new ImageFiltering();

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


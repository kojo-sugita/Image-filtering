
/**
 * アベレージフィルタ
 */
function goAverage() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(3);

    var smooth = new Smoothing(img);

    /* 空間フィルタリング */
    var filter = smooth.createAveragingFilter(5);
    var result = smooth.spatialFiltering(filter, 5);

    /* セット */
    loader.saveImage(result);
}

/**
 * ガウシアンフィルタ
 */
function goGaussian() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(3);

    var smooth = new Smoothing(img);

    /* 空間フィルタリング */
    var filter = smooth.createGaussianFilter(5, 2.0);
    var result = smooth.spatialFiltering(filter, 5);

    /* セット */
    loader.saveImage(result);
}

/**
 * メディアンフィルタ
 */
function goMedian() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(3);

    var smooth = new Smoothing(img);
    var result = smooth.medianFilltering(3);

    /* セット */
    loader.saveImage(result);
}

/**
 * 鮮鋭化フィルタ(4近傍)
 */
function goSharpening4() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(3);

    var sharp = new Sharpening(img);

    /* 空間フィルタリング */
    var filter = sharp.createSharpeningFilter(4, 0.5);
    var result = sharp.spatialFiltering(filter, 3);

    /* セット */
    loader.saveImage(result);
}

/**
 * 鮮鋭化フィルタ(8近傍)
 */
function goSharpening8() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(3);

    var sharp = new Sharpening(img);

    /* 空間フィルタリング */
    var filter = sharp.createSharpeningFilter(8, 0.5);
    var result = sharp.spatialFiltering(filter, 3);

    /* セット */
    loader.saveImage(result);
}

/**
 * プリューウィットフィルタ
 */
function goPrewitt() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(1);

    var edgeDetector = new EdgeDetector(img);

    /* Prewittフィルタ */
    var filter = edgeDetector.createPrewittFilterH();
    var result = edgeDetector.spatialFiltering(filter, 3);

    /* セット */
    loader.saveImage(result);
}

/**
 * ソーベルフィルタ
 */
function goSobel() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(1);

    var edgeDetector = new EdgeDetector(img);

    /* Sobelフィルタ */
    var filter = edgeDetector.createSobelFilterV();
    var result = edgeDetector.spatialFiltering(filter, 3);

    /* セット */
    loader.saveImage(result);
}

/**
 * ラプラシアンフィルタ
 */
function goLaplacian() {
    var loader = new ImageLoader("myCanvas", "image");
    var img = loader.loadImage(1);

    var edgeDetector = new EdgeDetector(img);

    /* Laplacianフィルタ */
    var filter = edgeDetector.createLaplacianFilter();
    var result = edgeDetector.spatialFiltering(filter, 3);

    /* セット */
    loader.saveImage(result);
}


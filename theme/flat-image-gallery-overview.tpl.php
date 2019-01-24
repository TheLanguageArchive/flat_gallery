<?php
/**
 * @file
 * Islandora SP Image Gallery overview template.
 */
?>
<div class="flat-image-gallery-container">
    <h1>Image Gallery</h1>
    <div class="flat-image-gallery-thumbnail">
        <?php if (false !== $current) : ?>
            <?php echo $current['viewer']; ?>
            <?php if ($current['label']) : ?>
                <div class="flat-image-gallery-caption">
                    <h3><?php echo $current['label']; ?></h3>
                </div>
            <?php endif;?>
        <?php endif; ?>
    </div>
    <div class="row">
        <div class="col-lg-offset-5">
            <p>
                <?php echo implode(' | ', $navigationLinks); ?>
            </p>
        </div>
    </div>
    <hr />
    <div class="row">
        <div class="col-lg-12">
            <div class="row">
                <?php foreach ($images as $image) : ?>
                <div class="col-lg-3">
                    <a href="<?php echo $image['url']; ?>" class="flat-image-gallery-thumbnail <?php echo $current['pid'] === $image['pid'] ? 'active' : ''; ?>">
                        <img style="height: 100px;" src="<?php echo $image['thumbnail']; ?>" />
                        <?php if ($image['label']) : ?>
                            <div class="flat-image-gallery-caption">
                                <small><?php echo $image['label']; ?></small>
                            </div>
                        <?php endif; ?>
                    </a>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>

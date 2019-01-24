<?php
/**
 * @file
 * Islandora SP Image Gallery overview template.
 */
?>
<div class="flat-image-gallery-container">
    <div class="flat-image-gallery-thumbnail">
        <?php if (false !== $current) : ?>
            <?php echo $current['viewer']; ?>
            <?php if (count($current['descriptions']) > 0) : ?>
                <div class="flat-image-gallery-caption">
                    <?php foreach ($current['descriptions'] as $description) : ?>
                        <h4><?php echo $description; ?></h4>
                    <?php endforeach; ?>
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
                        <?php if (count($image['descriptions']) > 0) : ?>
                            <div class="flat-image-gallery-caption">
                                <?php foreach ($image['descriptions'] as $description) : ?>
                                    <small><?php echo $description; ?></small><br />
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </a>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>

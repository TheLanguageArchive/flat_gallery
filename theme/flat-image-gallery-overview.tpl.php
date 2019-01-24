<?php
/**
 * @file
 * Islandora SP Image Gallery overview template.
 */
?>
<div class="flat-image-gallery-container">
    <h1><?php echo $islandora_object->label; ?> - images</h1>
    <div class="flat-image-gallery-thumbnail">
        <?php if (false !== $current) : ?>
            <?php echo $current['viewer']; ?>
            <div class="flat-image-gallery-caption">
                <small class="flat-image-gallery-viewer flat-image-gallery-caption-filename"><?php echo $current['filename']; ?></small>
                <?php foreach ($current['descriptions'] as $description) : ?>
                    <h4><?php echo $description; ?></h4>
                <?php endforeach; ?>
            </div>
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
                <div class="col-lg-4">
                    <a href="<?php echo $image['url']; ?>" class="flat-image-gallery-thumbnail <?php echo $current['pid'] === $image['pid'] ? 'active' : ''; ?>">
                        <img src="<?php echo $image['thumbnail']; ?>" />
                        <div class="flat-image-gallery-caption">
                            <small class="flat-image-gallery-caption-filename"><?php echo $image['filename']; ?></small>
                        </div>
                    </a>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    <hr />
    <div class="row">
        <div class="col-lg-offset-5">
            <p>
                <?php echo implode(' | ', $paginationLinks); ?>
            </p>
        </div>
    </div>
</div>

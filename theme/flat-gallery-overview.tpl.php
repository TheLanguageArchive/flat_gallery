<?php
/**
 * @file
 * FLAT Gallery overview template.
 */
?>
<div class="flat-gallery-fullscreen" data-role="flat-gallery-fullscreen">
    <div class="flat-gallery-nav hidden" data-role="flat-gallery-nav">
        <div class="flat-gallery-nav-prev" data-flat-gallery-nav="previous"></div>
        <div class="flat-gallery-nav-next" data-flat-gallery-nav="next"></div>
    </div>
    <div data-role="flat-gallery-fullscreen-element"></div>
</div>
<div class="flat-gallery">
    <div class="flat-gallery-preview-container">
        <h1><?php echo $islandora_object->label; ?></h1>
        <div class="flat-gallery-thumbnail" data-role="flat-gallery-viewer">
            <?php if (false !== $current) : ?>
                <div class="flat-gallery-viewer"><?php echo $current['viewer']; ?></div>
                <div class="flat-gallery-caption">
                    <small class="flat-gallery-caption-filename"><?php echo $current['filename']; ?></small>
                    <?php foreach ($current['descriptions'] as $description) : ?>
                        <h4><?php echo $description; ?></h4>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <div class="flat-gallery-container">
        <hr />
        <div class="flat-gallery-grid" data-role="flat-gallery-grid">
            <?php echo flat_gallery_render_items($items, $current['pid']); ?>
        </div>
        <hr />
        <div class="flat-gallery-grid-loading flat-gallery-grid-hidden" data-role="flat-gallery-grid-loading">
            <span>Loading more images...</span>
        </div>
    </div>
</div>

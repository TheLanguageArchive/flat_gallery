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
        <div class="center">
            <span data-role="flat-gallery-nav-textual"><?php echo implode(' | ', $navigationLinks); ?></span>
        </div>
        <hr />
        <div class="flat-gallery-grid">
            <?php foreach ($items as $item) : ?>
                <a title="<?php echo $item['filename']; ?>" href="<?php echo $item['url']; ?>" class="flat-gallery-grid-item<?php echo $current['pid'] === $item['pid'] ? ' flat-gallery-grid-item-active' : ''; ?>" data-role="flat-gallery-thumbnail" data-flat-gallery-id="<?php echo $item['id']; ?>">
                    <div class="flat-gallery-grid-item-thumbnail">
                        <img class="flat-gallery-grid-item-thumbnail-exif-<?php echo $item['exif']; ?>" data-load-image="<?php echo $item['id']; ?>" data-flat-lazy-load-image="true" data-src="<?php echo $item['thumbnail']; ?>" />
                    </div>
                    <small class="flat-gallery-grid-item-caption"><?php echo $item['filename']; ?></small>
                </a>
            <?php endforeach; ?>
        </div>
        <hr />
        <div class="center">
            <span><?php echo implode(' | ', $paginationLinks); ?></span>
        </div>
    </div>
</div>

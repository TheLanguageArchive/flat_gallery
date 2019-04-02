<?php
/**
 * @file
 * FLAT Gallery overview template.
 */
?>
<div class="flat-gallery" data-role="flat-gallery-preview">
    <div class="flat-gallery-preview-container">
        <h1><?php echo $islandora_object->label; ?> - media items</h1>
        <div class="flat-gallery-thumbnail">
            <?php if (false !== $current) : ?>
                <div data-role="flat-gallery-toggle-fullscreen" data-flat-gallery-fullscreen="false">
                    <div class="flat-gallery-nav hidden" data-role="flat-gallery-nav">
                        <div class="flat-gallery-nav-prev" data-flat-gallery-nav="previous"></div>
                        <div class="flat-gallery-nav-next" data-flat-gallery-nav="next"></div>
                    </div>
                    <?php echo $current['viewer']; ?>
                </div>
                <div class="flat-gallery-caption">
                    <small class="flat-gallery-viewer flat-gallery-caption-filename"><?php echo $current['filename']; ?></small>
                    <?php foreach ($current['descriptions'] as $description) : ?>
                        <h4><?php echo $description; ?></h4>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <div class="flat-gallery-container">
        <div class="center">
            <span><?php echo implode(' | ', $navigationLinks); ?></span>
        </div>
        <hr />
        <div class="flat-gallery-grid">
            <?php foreach ($items as $item) : ?>
            <div class="flat-gallery-grid-column">
                <a title="<?php echo $item['filename']; ?>" href="<?php echo $item['url']; ?>" class="flat-gallery-thumbnail <?php echo $current['pid'] === $item['pid'] ? 'active' : ''; ?>">
                    <div class="flat-gallery-thumbnail-container">
                        <img src="<?php echo $item['thumbnail']; ?>" />
                    </div>
                    <div class="flat-gallery-caption">
                        <small class="flat-gallery-caption-filename"><?php echo $item['filename']; ?></small>
                    </div>
                </a>
            </div>
            <?php endforeach; ?>
        </div>
        <hr />
        <div class="center">
            <span><?php echo implode(' | ', $paginationLinks); ?></span>
        </div>
    </div>
</div>

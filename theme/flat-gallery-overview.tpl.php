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
        <div class="flat-gallery-thumbnail">
            <?php if (false !== $current) : ?>
                <div class="flat-gallery-viewer" data-role="flat-gallery-viewer"><?php echo $current['viewer']; ?></div>
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
            <div class="flat-gallery-grid-column" data-role="flat-gallery-thumbnail" data-flat-gallery-id="<?php echo $item['id']; ?>">
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

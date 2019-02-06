<?php
/**
 * @file
 * FLAT Gallery overview template.
 */
?>
<div class="flat-gallery-container">
    <h1><?php echo $islandora_object->label; ?> - media items</h1>
    <div class="flat-gallery-thumbnail">
        <?php if (false !== $current) : ?>
            <?php echo $current['viewer']; ?>
            <div class="flat-gallery-caption">
                <small class="flat-gallery-viewer flat-gallery-caption-filename"><?php echo $current['filename']; ?></small>
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
                <?php foreach ($items as $item) : ?>
                <div class="col-lg-<?php echo (12 / $max_per_row); ?>">
                    <a href="<?php echo $item['url']; ?>" class="flat-gallery-thumbnail <?php echo $current['pid'] === $item['pid'] ? 'active' : ''; ?>">
                        <img src="<?php echo $item['thumbnail']; ?>" />
                        <div class="flat-gallery-caption">
                            <small class="flat-gallery-caption-filename"><?php echo $item['filename']; ?></small>
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

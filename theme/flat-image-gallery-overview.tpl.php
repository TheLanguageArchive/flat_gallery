<?php
/**
 * @file
 * Islandora SP Image Gallery overview template.
 */
?>
<div class="islandora-sp-ig-thumbnail">
    <?php if (false !== $current) : ?>
        <?php echo $current['viewer']; ?>
        <?php if ($current['label']) : ?>
            <div class="islandora-sp-ig-caption">
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
                <a href="<?php echo $image['url']; ?>" class="islandora-sp-ig-thumbnail <?php echo $current['pid'] === $image['pid'] ? 'active' : ''; ?>">
                    <img style="height: 100px;" src="<?php echo $image['thumbnail']; ?>" />
                    <?php if ($image['label']) : ?>
                        <div class="islandora-sp-ig-caption">
                            <small><?php echo $image['label']; ?></small>
                        </div>
                    <?php endif; ?>
                </a>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>

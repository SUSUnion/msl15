$(document).ready(function () {
    $('#news .news_image').each(function () {
        $this = $(this);
        $('#news').prepend($this);
        img = $this.find('img');
        src = img.attr('src').split('?');
        img.attr('src', src[0] + '?thumbnail_width=800&thumbnail_height=460&resize_type=CropToFit');
        $this.append( $('#news > h1') );
    });
});
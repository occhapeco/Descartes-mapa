// Initialize your app
var myApp = new Framework7({
    material: true,
    pushState: true,
    animatePages: true,
    swipePanel: "left",
    swipePanelActiveArea:40
});

// Export selectors engine
var $$ = Dom7;

var o = true;

var swidth = $$("#ba").width() - $$("#searche").width() - $$("#bc").width() - 16;
swidth+='px';
$$("#hc").css('width',swidth);

$$('#searche').on('click', function (e){
    if (o) 
    {
        $$("#hc").css('width',swidth );
        $$("#hc").toggleClass('hi');
        $$("#hd").toggleClass('hi');
        $$("#loc").toggleClass('fa-search, fa-remove');
        o = false;
    }else
    {
        $$("#hc").css('width',swidth);
        $$("#hd").toggleClass('hi');
        $$("#hc").toggleClass('hi');
        $$("#loc").toggleClass('fa-search, fa-remove');
        o = true;
    }
    
});
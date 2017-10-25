
'use strict';

var AppView = AppView || {};

AppView.ImagesModel = Backbone.Model.extend();

AppView.dataCollection = Backbone.Collection.extend({
      model: AppView.ImagesModel,

});

var newData = new AppView.dataCollection([
    {
        title: "First Block",
        images: [
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/163697/slide-1.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/163697/slide-2.jpg',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/163697/slide-3.jpg',
            'http://www.slidesjs.com/examples/basic/img/example-slide-1.jpg'
        ]
    },
    {
        title: "Second Block",
        images: [
            'https://www.lingulo.com/tutorial-content/html5/img/example-slide-4.jpg',
            'http://imgsv.imaging.nikon.com/lineup/lens/zoom/normalzoom/af-s_dx_18-300mmf_35-56g_ed_vr/img/sample/sample4_l.jpg',
            'http://imaging.nikon.com/lineup/lens/zoom/normalzoom/af-s_dx_18-140mmf_35-56g_ed_vr/img/sample/sample1_l.jpg',
            'https://www.flooringvillage.co.uk/ekmps/shops/flooringvillage/images/request-a-sample--547-p.jpg'
        ]
    },
    {
        title: "Third Block",
        images: [
            'https://amsterdam.luminis.eu/wp-content/uploads/2014/12/grunt_logo.jpg',
            'https://nikonrumors.com/wp-content/uploads/2014/03/Nikon-1-V3-sample-photo.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/1/16/HDRI_Sample_Scene_Balls_%28JPEG-HDR%29.jpg',
            'http://indianapublicmedia.org/arts/files/2012/04/sample-gates-9-940x626.jpg'
        ]
    },
    {
        title: "Fourth Block",
        images: [
            'http://cameratimes.org/wp-content/uploads/2016/01/Nikon-D500-Sample-Images-7-620x414.jpg',
            'http://farm6.staticflickr.com/5331/9016034642_419f326d7a_b.jpg',
            'http://www.cameraegg.org/wp-content/uploads/2013/03/Sony-A58-Sample-Image.jpg',
            'http://static.hasselblad.com/uploads/2014/11/Illmorran-2-1000x666.jpg'
        ]
    },

]);


AppView.mainView = Backbone.View.extend({

    el: '#container',

    events: {
        "click #next-button": "nextImage",
        "click #back-button": "backImage",
    },

    initialize: function () {
        this.render();
        this.currentBlock = 0;
        this.images = this.collection.toJSON();
        this.nextButton = $("#next-button");
        this.backButton = $("#back-button");
        this.slides = $(".inner").children();        
        this.view = this;
        this.view.backButton.addClass('disableButton');
    },
    tagName: "div",
    template: _.template($("#carouselTemplate").html()),
    render: function () {
        var self = this;        
        return self.$el.html(self.template({collection: self.collection.toJSON()}));

    },

    nextImage: function () {

        var currentSlide = $(this.slides[this.currentBlock]);;

        this.currentBlock++;

        var randomImage = this.images[this.currentBlock];

        var nextSlide = $(this.slides[this.currentBlock]);

        if (this.currentBlock === 3) {
            this.view.nextButton.addClass("disableButton");
        }
        if (this.currentBlock > 0) {
            this.view.backButton.removeClass("disableButton");
        }
        
        currentSlide.animate({
            opacity: 0
        }, 100, function () {
            currentSlide.removeClass('active');
            
            nextSlide.css("background-image", "url(" + randomImage.images[Math.floor(Math.random() * 4)] + ")").promise().done(function () {
                
                nextSlide.animate({
                    opacity: 1
                }, 600);
                nextSlide.html("<h4>" + randomImage.title + "</h4>");
                nextSlide.addClass('active');
            });
        });
    },

    backImage: function () {

        var currentSlide = $(this.slides[this.currentBlock]);;

        this.currentBlock--;

        var randomImage = this.images[this.currentBlock];

        var nextSlide = $(this.slides[this.currentBlock]);

        if (this.currentBlock === 0) {
            this.view.backButton.addClass("disableButton");
        }
        if (this.currentBlock < 3) {
            this.view.nextButton.removeClass("disableButton");
        }

       
        currentSlide.animate({
            opacity: 0
        }, 100, function () {
            
            nextSlide.css("background-image", "url(" + randomImage.images[Math.floor(Math.random() * 4)] + ")").promise().done(function () {
               
                nextSlide.animate({
                    opacity: 1
                }, 600);
              
                nextSlide.addClass('active');
            });
        })

    }
});

new AppView.mainView({model: new AppView.ImagesModel(), collection: newData})



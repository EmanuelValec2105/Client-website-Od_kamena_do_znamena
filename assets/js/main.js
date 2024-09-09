(function ($) {
    "use strict";

    $(document).ready(function($){
        
        var iso = new Isotope('.product-lists', {
            itemSelector: '.col-lg-4',
            layoutMode: 'fitRows',
            getSortData: {
                price: function (itemElem) {
                    var price = itemElem.querySelector('.product-price').innerText;
                    return parseFloat(price.replace('€', ''));
                },
                name: 'h3',
                originalOrder: function (itemElem) { // original order based on the HTML order
                    return parseInt(itemElem.getAttribute('data-original-order'), 10);
                }
            }
        });

        // Add sorting event listener here
        $('#sortFilter').on('change', function() {
            var sortValue = $(this).val();
            var sortBy = sortValue;
            var isAscending = true; // default to ascending
            
            // Check if the sortValue contains ':asc' or ':desc' to determine order
            if(sortValue.indexOf(':asc') > -1) {
              isAscending = true;
              sortBy = sortValue.split(':asc')[0];
            } else if(sortValue.indexOf(':desc') > -1) {
              isAscending = false;
              sortBy = sortValue.split(':desc')[0];
            }
          
            // Check if the 'Zadano' or default order is selected
            if(sortValue === 'original-order') {
              sortBy = 'originalOrder';
            }
          
            iso.arrange({
              sortBy: sortBy,
              sortAscending: isAscending
            });
          });
          

          $(window).on('load', function() {
            var urlParams = new URLSearchParams(window.location.search);
            var filter = urlParams.get('filter');
    
            // If a filter is provided, set the Isotope filter
            if(filter) {
                $('#categoryFilter').val(filter); // Set the value of the dropdown
                iso.arrange({ filter: filter }); // Arrange Isotope with the filter
            }
        });  
        // Custom Dropdown Initialization
        var x, i, j, l, ll, selElmnt, a, b, c;
        x = document.getElementsByClassName("custom-dropdown");
        l = x.length;
        for (i = 0; i < l; i++) {
            selElmnt = x[i].getElementsByTagName("select")[0];
            ll = selElmnt.length;
    
            a = document.createElement("DIV");
            a.setAttribute("class", "select-selected");
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
    
            b = document.createElement("DIV");
            b.setAttribute("class", "select-items select-hide");
            for (j = 1; j < ll; j++) {
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener("click", function (e) {
                    var y, i, k, s, h, sl, yl;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    sl = s.length;
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < sl; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName("same-as-selected");
                            yl = y.length;
                            for (k = 0; k < yl; k++) {
                                y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", "same-as-selected");
                            break;
                        }
                    }
                    h.click();
    
                    // Trigger Isotope filter or sort
                    if(s.id === 'categoryFilter') {
                        iso.arrange({filter: s.value});
                    } else if(s.id === 'sortFilter') {
                        var sortValue = s.value;
                        var isAsc = sortValue.endsWith('asc');
                        var sortBy = sortValue.replace(':asc','').replace(':desc','');
                        // Use 'originalOrder' for the default sort
                        sortBy = sortValue === 'original-order' ? 'originalOrder' : sortBy;
                        iso.arrange({
                            sortBy: sortBy,
                            sortAscending: isAsc
                        });
                    }   
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function (e) {
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
            });
        }
    
        function closeAllSelect(elmnt) {
            var x, y, i, xl, yl, arrNo = [];
            x = document.getElementsByClassName("select-items");
            y = document.getElementsByClassName("select-selected");
            xl = x.length;
            yl = y.length;
            for (i = 0; i < yl; i++) {
                if (elmnt == y[i]) {
                    arrNo.push(i);
                } else {
                    y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < xl; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add("select-hide");
                }
            }
        }
    
        document.addEventListener("click", closeAllSelect);

        

        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            dots: true,
            nav: true, // Enable navigation
            navText: ["<", ">"], // You can use your own icons or text here
            responsive: {
              0: {
                items: 1,
                nav: false
              },
              600: {
                items: 1,
                nav: false
              },
              1000: {
                items: 1,
                nav: false,
                loop: true
              }
            }
          });
          $(document).keydown(function(e) {
            var owl = $(".testimonial-sliders");
            if (e.keyCode === 37) {
              owl.trigger('prev.owl.carousel');
            } else if (e.keyCode === 39) {
              owl.trigger('next.owl.carousel');
            }
          });

        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:true,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }
            }
        });

        // logo carousel
        $(".logo-carousel-inner").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            margin: 30,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:false,
                    loop:true
                }
            }
        });

        // count down
        if($('.time-countdown').length){  
            $('.time-countdown').each(function() {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
            });
         });
        }

        // projects filters isotop
        $(".product-filters li").on('click', function () {
            
            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');

            $(".product-lists").isotope({
                filter: selector,
            });
            
        });
        
        // isotop inner
        $(".product-lists").isotope();

        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });

        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

        $(".homepage-slider").on("translated.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

       

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });

        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
        
         // search form
        $(".search-bar-icon").on("click", function(){
            $(".search-area").addClass("search-active");
        });

        $(".close-btn").on("click", function() {
            $(".search-area").removeClass("search-active");
        });
        
        function updateProductDetails() {
            var selectSize = document.getElementById("size-select");
            var productPrice = document.getElementById("product-price");
            var selectedOption = selectSize.options[selectSize.selectedIndex];
        
            // Update price based on the data-price attribute of the selected option
            productPrice.innerHTML = selectedOption.getAttribute("data-price") + ' €';
        }
        
        // Initialize the product details on page load
        document.addEventListener('DOMContentLoaded', updateProductDetails);
        
        // Attach the change event listener to the dropdown
        document.getElementById('size-select').addEventListener('change', updateProductDetails);
    
    });


    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
    });


}(jQuery));
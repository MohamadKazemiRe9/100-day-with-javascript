$(document).ready(function(){
    let slides = $(".slider img");
    let currentSlide = 0;
    let isPause = false;

    // create pages numbers
    // let newElement = $(`<li class="page-item"><a class="page-link" href="#">1</a></li>`);
    // $(".pagination").append(newElement);
    // $(".page-item").eq(0).after(newElement);

    for (let index=slides.length; index>=1; index--) {
        let newElement = $(`<li class="page-item"><a class="page-link" href="#">${index}</a></li>`);
        $(".page-item").eq(0).after(newElement);
    }

    // active slider paginator
    function activePageItem(counter){
        $(".page-item").eq(counter).addClass("active");
        if(counter==1){
            $(".page-item").eq(slides.length).removeClass("active");
        }else{
            $(".page-item").eq(counter-1).removeClass("active");
        }
    }

    function startSlider(){
        slideInterval = setInterval(()=>{
            slides.eq(currentSlide).fadeOut(1000);
            currentSlide = (currentSlide+1) % slides.length;
            activePageItem(currentSlide+1);
            slides.eq(currentSlide).fadeIn(1000);
        }, 3000);
        return slideInterval;
    }

    slides.eq(currentSlide).show();
    let slideShow = startSlider()
    $(".slider").click(pause)
    activePageItem(1);

    function pause(){
        if (isPause){
            startSlider();
            isPause = false;
        }else{
            clearInterval(slideInterval);
            isPause = true;
        }
    }
})
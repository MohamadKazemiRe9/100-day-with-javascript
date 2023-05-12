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
        let paginations = $(".page-item");
        for (let slide of paginations) {
            $(slide).removeClass("active");
        }
        $(".page-item").eq(counter).addClass("active"); 
    }

    // click on slider paginations
    $(".page-link").click(function(){
        // if we click on numbers
        console.log(Number(this.text))
        let text = this.text
        if(isNaN(Number(text))){
             // check is next or previous is in the text
            if (text.toLowerCase().includes("next")) {
                clearInterval(slideInterval)
                slides.eq(currentSlide).fadeOut(1000);
                currentSlide = (currentSlide + 1) % slides.length;
                slides.eq(currentSlide).fadeIn(1000);
                activePageItem(currentSlide+1); // in curent slide we start from 1
                startSlider();
            } else {
                clearInterval(slideInterval)
                slides.eq(currentSlide).fadeOut(1000);
                currentSlide = (currentSlide - 1) % slides.length;
                if(currentSlide < 0){
                    currentSlide = slides.length - 1;
                }
                console.log(currentSlide)
                slides.eq(currentSlide).fadeIn(1000);
                activePageItem(currentSlide+1); // in curent slide we start from 1
                startSlider();
            }
        }
        // or if we click on the next and prevoius
        else{
            clearInterval(slideInterval);
            slides.eq(currentSlide).fadeOut(1000);
            currentSlide = Number(text) - 1;
            slides.eq(currentSlide).fadeIn(1000);
            activePageItem(currentSlide+1); // in curent slide we start from 1
            startSlider();
        }
    })

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
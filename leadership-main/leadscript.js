const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});


// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})



//Profile Dropdown
function menuToggle(){
	const toggleMenu = document.querySelector('.menu');
	toggleMenu.classList.toggle('active')
}



const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})



// Main containt
function openTab(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    // THIS IS NEW CODE
    if (tabName == 'tab3') {
      $('.sort-isotope').val('avgPoints');
      sortTable('');
      if ($(window).width() <= 767) {
        $('select.col-filter').show();
      } else {
        $('select.col-filter').hide();
      }
    } else {
      $('select.col-filter').hide();
    }
    initIsotope();
    // THIS IS NEW CODE
  }
  function openFilterModal() {
    document.getElementById('filter-modal').style.display = 'block';
  }
  function closeFilterModal() {
    document.getElementById('filter-modal').style.display = 'none';
  }
  function openFilterModal1() {
    document.getElementById('filter-modal1').style.display = 'block';
  }
  function closeFilterModal1() {
    document.getElementById('filter-modal1').style.display = 'none';
  }
  function openTeammembersModal() {
    document.getElementById('team-members-modal').style.display = 'block';
  }
  function closeTeammembersModal() {
    document.getElementById('team-members-modal').style.display = 'none';
  }
  
  // THIS IS NEW CODE
  let $grid;
  function initIsotope () {
    $grid = $('#tab3 .grid').isotope({
      itemSelector: '#tab3 .table-row',
      getSortData: {
        teams: function($elem){
          var ele = $($elem).find('.points.blue-txt:nth-child(1)');
          return parseInt(ele.contents().not(ele.children()).text().trim());
        },
        points: function($elem){
          var ele = $($elem).find('.points.blue-txt:nth-child(2)');
          return parseInt(ele.contents().not(ele.children()).text().trim());
        },
        avgPoints: function($elem){
          var ele = $($elem).find('.trophy.blue-txt');
          return parseInt(ele.contents().not(ele.children()).text().trim());
        }
      }
    });
  }
  initIsotope();
  $('.sort-isotope').on('change', function (e) {
      sortTable(e.target.value);
  });
  $('.sort-isotope-click').on('click', function (e) {
      sortTable($(this).attr('data-sortbyval'));
  })
  
  function sortTable (colName) {
    if(colName == ''){
      colName = 'avgPoints';
    }
    let xsClass = colName; 
    if(colName == 'avgPoints'){
      xsClass = 'avg-points';
    }
    $grid.isotope({ sortBy: colName, sortAscending: false }); // UPDATE FOR DESCENDING SORT
    $('#tab3 .table-row').removeClass('gold sliver bronze');
    $('#tab3').removeClass('xs-show-avg-points xs-show-teams xs-show-points')
      .addClass(`xs-show-${xsClass}`);
    const filteredItems = $grid.data('isotope').filteredItems;
    const rankCls = ['gold','sliver','bronze'];
    $.each(filteredItems, function(k, i){
      let elem = $(i.element);
      if(cls = rankCls[k]){
        elem.addClass(cls);
      }
      elem.find('.number-count').text(k+1);
    });
  }
  
  $('.highlight-ranking-deatils').click(function () {
    if ($(window).width() < 768) {
      $(this).next('.highlight-row').toggleClass('w3-hide');
      let $toggleIcon = $(this).find('i'),
          $toggleSvg = $($(this).find('svg')[0]);
      if($(this).next('.highlight-row').hasClass('w3-hide')){
        $toggleSvg.removeAttr('data-icon').attr('data-icon','chevron-up').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        $toggleIcon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
      }else{
        $toggleSvg.removeAttr('data-icon').attr('data-icon','chevron-down').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        $toggleIcon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
      }
    }
  });
  
  if ($(window).width() < 768) {
    $('.hightlight-ranking-container .highlight-row').addClass('w3-hide');
  }
  $(window).resize(function(){
    if ($(window).width() < 768) {
      $('.hightlight-ranking-container .highlight-row').addClass('w3-hide');
    }else{
      $('.hightlight-ranking-container .highlight-row').removeClass('w3-hide');
    }
  })
  
  // THIS IS NEW CODE
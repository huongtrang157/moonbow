var pageId,
  sw,
  sh,
  xbar,
  isRun = !1,
  btnMenu = $("#jsBtnMenu"),
  btnSubMenu = $(".jsOurWork .hasSubMenu"),
  btnOurProject = $(".jsBtnOurwork"),
  pageIdCurrent = "",
  wScreen = window.innerWidth,
  chuyentrang = !1,
  count = 0,
  sCircle = 1,
  appSpeed = 1,
  mouseX = (mouseY = 0),
  mouseSpeed = 0,
  isOverStage = !1;
(sw = $(window).innerWidth()),
  (sh = $(window).innerHeight()),
  console.log(sw, sh);
var tabletW = 1024,
  tabletH = 768,
  mobileW = 567,
  screenHorizontal = sw > sh && sh < 1266,
  ipadproHorizontal = sw > 1365 && sh >= 900 && sw < 1367,
  ipadproVertical = sw > 1023 && sh >= 1265 && sw < 1025;
(xbar = screenHorizontal
  ? wScreen / 2 - 80
  : ipadproVertical
  ? wScreen - 130
  : wScreen - 66),
  barba.hooks.leave((e) => {}),
  barba.init({
    debug: !1,
    transitions: [
      {
        name: "home-transition",
        sync: !0,
        beforeLeave: function (e) {
          ($(btnMenu).hasClass("active") ||
            $(btnOurProject).hasClass("active")) &&
            BY.FUNC.closeMenu(btnMenu);
        },
        leave: function (e) {
          var a = this.async();
          TweenMax.to(e.current.container, 1, {
            autoAlpha: 0,
            y: "-50%",
            ease: Power4.easeOut,
            onComplete: a,
          });
        },
        enter: function (e) {
          var a = this.async();
          (pageId = $(e.next.container).attr("id")),
            lazyLoadAll(),
            (screenHorizontal || ipadproHorizontal) &&
              $(".nano").nanoScroller({ sliderMaxHeight: 20 }),
            BY.FUNC.disableClick(),
            "pHome" === pageId
              ? (sw > sh && BY.FUNC.showHideAstro(),
                screenHorizontal
                  ? (BY.NAV.init(),
                    $("#navMenu").on("mouseenter", function () {
                      BY.FUNC.hideCircle();
                    }),
                    $("#navMenu").on("mouseleave", function () {
                      BY.FUNC.showCircle();
                    }))
                  : $(".homeElms .elm").addClass("run"),
                TweenMax.from(e.next.container, 1, {
                  delay: 0.7,
                  y: "30%",
                  opacity: 0,
                  ease: Power4.easeOut,
                  onComplete: function () {
                    a(), $(".ovlLink").hide();
                  },
                }))
              : "pAbout" === pageId
              ? (BY.ABOUT.init(),
                TweenMax.from(e.next.container, 1, {
                  delay: 0.7,
                  y: "30%",
                  opacity: 0,
                  ease: Power4.easeOut,
                  onComplete: function () {
                    a(), $(".ovlLink").hide();
                  },
                }))
              : "pCourseDetail" === pageId
              ? (BY.WORKDETAIL.init(),
                TweenMax.from(e.next.container, 1, {
                  delay: 0.7,
                  y: "30%",
                  opacity: 0,
                  ease: Power4.easeOut,
                  onComplete: function () {
                    a(),
                      $(".ovlLink").hide(),
                      setTimeout(() => {
                        screenHorizontal && BY.WORK.init();
                      }, 1e3);
                  },
                }))
              : TweenMax.from(e.next.container, 1, {
                  delay: 0.7,
                  y: "30%",
                  opacity: 0,
                  ease: Power4.easeOut,
                  onComplete: function () {
                    a(), $(".ovlLink").hide();
                  },
                });
        },
        beforeEnter: function (e) {
          pageId = $(e.next.container).attr("id");
        },
        afterEnter: function (e) {
          if (
            ((pageId = $(e.next.container).attr("id")),
            BY.DEVICE.bar(),
            "pHome" === pageId)
          )
            sw < tabletW && BY.DEVICE.home();
          else if ("pOurWork" === pageId);
          else if ("pCourseDetail" === pageId);
          else if ("pPeople" === pageId) {
            if (screenHorizontal || ipadproHorizontal) {
              if ((BY.PEOPLE.init(), ipadproHorizontal))
                new TimelineMax({ repeat: -1 })
                  .to(".thumbs .front", 1, { delay: 3, autoAlpha: 0 }, "s")
                  .to(".thumbs .back", 1, { delay: 3, autoAlpha: 1 }, "s")
                  .to(".thumbs .front", 1, { delay: 3, autoAlpha: 1 }, "s2")
                  .to(".thumbs .back", 1, { delay: 3, autoAlpha: 0 }, "s2");
            } else sw <= tabletW && BY.DEVICE.people();
          } else "pConnect" === pageId && screenHorizontal && BY.CLIENT.init();
        },
      },
    ],
  });
var BY = {
  init: function () {
    if ((BY.GLOBAL.init(), $("#pPeople").length)) {
      if (screenHorizontal) {
        if ((BY.PEOPLE.init(), ipadproHorizontal))
          new TimelineMax({ repeat: -1 })
            .to(".thumbs .front", 1, { delay: 3, autoAlpha: 0 }, "s")
            .to(".thumbs .back", 1, { delay: 3, autoAlpha: 1 }, "s")
            .to(".thumbs .front", 1, { delay: 3, autoAlpha: 1 }, "s2")
            .to(".thumbs .back", 1, { delay: 3, autoAlpha: 0 }, "s2");
      } else
        (sw <= tabletW || ipadproVertical || ipadproHorizontal) &&
          BY.DEVICE.people();
      BY.clound();
    }
    $("#pHome").length &&
      (setTimeout(() => {
        BY.FUNC.hidePreloader();
      }, 1e3),
      sw <= tabletW && BY.DEVICE.home()),
      $("#pCourseDetail").length &&
        (BY.WORKDETAIL.init(), screenHorizontal && BY.WORK.init(), BY.clound()),
      $("#pOurWork").length && BY.clound(),
      $("#pConnect").length && (BY.CLIENT.init(), BY.clound()),
      $("#pAbout").length && (BY.clound(), BY.ABOUT.init()),
      sw < 1025 && BY.FUNC.disableHoverOnMobile(),
      (ipadproHorizontal || ipadproVertical) &&
        (BY.FUNC.disableHoverOnMobile(), BY.DEVICE.home()),
      BY.DEVICE.bar();
  },
  GLOBAL: {
    init: function () {
      BY.FUNC.onClickBtnHandler(),
        BY.FUNC.disableClick(),
        sw > 1025 && BY.FUNC.showHideAstro(),
        (screenHorizontal || ipadproHorizontal) &&
          $(".nano").nanoScroller({ sliderMaxHeight: 20 });
    },
  },
  NAV: {
    init: function () {
      var e = [
          {},
          {
            movement: {
              imgWrapper: {
                translation: { x: 10, y: 10, z: 30 },
                rotation: { x: 0, y: -10, z: 0 },
                reverseAnimation: { duration: 200, easing: "easeOutQuad" },
              },
              lines: {
                translation: { x: 10, y: 10, z: [0, 70] },
                rotation: { x: 0, y: 0, z: -2 },
                reverseAnimation: { duration: 2e3, easing: "easeOutExpo" },
              },
              caption: {
                rotation: { x: 0, y: 0, z: 2 },
                reverseAnimation: { duration: 200, easing: "easeOutQuad" },
              },
              overlay: {
                translation: { x: 10, y: -10, z: 0 },
                rotation: { x: 0, y: 0, z: 2 },
                reverseAnimation: { duration: 2e3, easing: "easeOutExpo" },
              },
              shine: {
                translation: { x: 100, y: 100, z: 0 },
                reverseAnimation: { duration: 200, easing: "easeOutQuad" },
              },
            },
          },
          {
            movement: {
              imgWrapper: {
                rotation: { x: -5, y: 10, z: 0 },
                reverseAnimation: { duration: 900, easing: "easeOutCubic" },
              },
              caption: {
                translation: { x: 30, y: 30, z: [0, 40] },
                rotation: { x: [0, 15], y: 0, z: 0 },
                reverseAnimation: { duration: 1200, easing: "easeOutExpo" },
              },
              overlay: {
                translation: { x: 10, y: 10, z: [0, 20] },
                reverseAnimation: { duration: 1e3, easing: "easeOutExpo" },
              },
              shine: {
                translation: { x: 100, y: 100, z: 0 },
                reverseAnimation: { duration: 900, easing: "easeOutCubic" },
              },
            },
          },
          {
            movement: {
              imgWrapper: {
                rotation: { x: -5, y: 10, z: 0 },
                reverseAnimation: { duration: 50, easing: "easeOutQuad" },
              },
              caption: {
                translation: { x: 20, y: 20, z: 0 },
                reverseAnimation: { duration: 200, easing: "easeOutQuad" },
              },
              overlay: {
                translation: { x: 5, y: -5, z: 0 },
                rotation: { x: 0, y: 0, z: 6 },
                reverseAnimation: { duration: 1e3, easing: "easeOutQuad" },
              },
              shine: {
                translation: { x: 50, y: 50, z: 0 },
                reverseAnimation: { duration: 50, easing: "easeOutQuad" },
              },
            },
          },
          {
            movement: {
              imgWrapper: {
                translation: { x: -25, y: -25, z: [0, 50] },
                rotation: { x: 15, y: 15, z: 0 },
                reverseAnimation: { duration: 1200, easing: "easeOutExpo" },
              },
              caption: {
                translation: { x: 2, y: -2, z: 0 },
                reverseAnimation: { duration: 2e3, easing: "easeOutExpo" },
              },
            },
          },
          {
            movement: {
              lines: {
                translation: { x: -5, y: 5, z: 0 },
                reverseAnimation: { duration: 1e3, easing: "easeOutExpo" },
              },
              caption: {
                translation: { x: 15, y: 15, z: 0 },
                rotation: { x: 0, y: 0, z: 3 },
                reverseAnimation: {
                  duration: 1500,
                  easing: "easeOutElastic",
                  elasticity: 700,
                },
              },
              overlay: {
                translation: { x: 15, y: -15, z: 0 },
                reverseAnimation: { duration: 500, easing: "easeOutExpo" },
              },
              shine: {
                translation: { x: 50, y: 50, z: 0 },
                reverseAnimation: { duration: 500, easing: "easeOutExpo" },
              },
            },
          },
          {
            movement: {
              imgWrapper: {
                translation: { x: 5, y: 5, z: 0 },
                reverseAnimation: { duration: 800, easing: "easeOutQuart" },
              },
              caption: {
                translation: { x: 10, y: 10, z: [0, 50] },
                reverseAnimation: { duration: 1e3, easing: "easeOutQuart" },
              },
              shine: {
                translation: { x: 50, y: 50, z: 0 },
                reverseAnimation: { duration: 800, easing: "easeOutQuart" },
              },
            },
          },
          {
            movement: {
              lines: {
                translation: { x: 40, y: 40, z: 0 },
                reverseAnimation: { duration: 1500, easing: "easeOutElastic" },
              },
              caption: {
                translation: { x: 20, y: 20, z: 0 },
                rotation: { x: 0, y: 0, z: -5 },
                reverseAnimation: { duration: 1e3, easing: "easeOutExpo" },
              },
              overlay: {
                translation: { x: -30, y: -30, z: 0 },
                rotation: { x: 0, y: 0, z: 3 },
                reverseAnimation: { duration: 750, easing: "easeOutExpo" },
              },
              shine: {
                translation: { x: 100, y: 100, z: 0 },
                reverseAnimation: { duration: 750, easing: "easeOutExpo" },
              },
            },
          },
        ],
        a = 0;
      [].slice.call(document.querySelectorAll(".prl")).forEach(function (t, o) {
        (a = o % 2 == 0 ? a + 1 : a), new TiltFx(t, e[1]);
      });
    },
  },
  PEOPLE: {
    init: function () {
      new TimelineLite();
      $(".nano").nanoScroller({ sliderMaxHeight: 20 }),
      $(".jsPeopleTab li").on("click", function () {
        var e = $(this).index();
        $(this).hasClass("active") ||
            ($(".jsPeopleTab li").removeClass("active"),
            $(".peopleWrap .item").removeClass("display"),
            setTimeout(function(){
              $(".jsPeopleTab li:eq(" + e + ")").addClass("active");
              $(".peopleWrap .item:eq(" + e + ")").addClass("display");
            }, 100));
      });
      var a = location.hash;
      if (a != "") {
        $(a).click();
      }
    },
  },
  DEVICE: {
    home: function () {
      $("#navMenu li").mouseenter(function () {
          $(".astro .active div").css("background-image", `url('../images/whale2.png')`);
      }),
      $("#navMenu li").mouseleave(function () {
          $(".astro .active div").css("background-image", `url('../images/whale1.png')`)
      });
    },
    people: function () {
      new TimelineMax({ repeat: -1 })
        .to(".thumbs .front", 1, { delay: 3, autoAlpha: 0 }, "s")
        .to(".thumbs .back", 1, { delay: 3, autoAlpha: 1 }, "s")
        .to(".thumbs .front", 1, { delay: 3, autoAlpha: 1 }, "s2")
        .to(".thumbs .back", 1, { delay: 3, autoAlpha: 0 }, "s2"),
        $(".jsPeopleTab li").on("click", function () {
          var e = $(this).index();
          $(this).hasClass("active") ||
            ($(".ourPeople").scrollTop(0),
            $(".jsPeopleTab li").removeClass("active"),
            $(this).addClass("active"),
            $(".peopleWrap .item").removeClass("display"),
            $(".peopleWrap .item:eq(" + e + ")").addClass("display"));
        });
      var a = location.hash;
      if (a != "") {
        $(a).click();
      }
    },
    bar: function () {
      var e = window.innerHeight;
      $(".barContain, .main").height(e),
        $(window).on("resize", function () {
          (e = window.innerHeight), $(".barContain, .main").height(e);
        });
    },
  },
  ABOUT: {
    init: function () {
      (screenHorizontal || ipadproHorizontal) &&
        $("#pAbout .nano").nanoScroller({ scrollTop: 0 });
      var e = location.hash;
      if (((e = e.substring(1, e.length)), $("#copyServices").length))
        var a =
          $("#copyServices").offset().top - $("#pAbout .copy").offset().top;
      switch (e) {
        case "services":
          screenHorizontal || ipadproHorizontal
            ? $("#pAbout .nano").nanoScroller({ scrollTop: a })
            : $("#pAbout .nano > .nano-content").animate({ scrollTop: a }, 0);
      }
    },
  },
  WORK: {
    init: function () {
      var e = $(".jsListWork li").length,
        a = !1;
      var isRunProject = false;
      $(".JsScrollDown[direction='up']").hide();
      TweenMax.set($(".jsListWork li"), { y: "50%", autoAlpha: 0 });
      TweenMax.set($(".jsListWork li.display"), { y: "0%", autoAlpha: 1 });

      $(".JsScrollDown").on("click", function () {
        //console.log('lan 1',isRunProject)
        if (isRunProject) return;
        //console.log('lan 2',isRunProject)
        var d = $(this).attr("direction");
        if (d === "up") {
          Up();
        } else {
          Down();
        }
        //console.log('lan 3',isRunProject)
      });

      function Up() {
        var ItemActive = $(".jsListWork li.display");
        var o = $(ItemActive).index() + 1;
        var t = ItemActive;
        var i = o - 2;
        TweenMax.set($(".jsListWork li:not(.display)"), {
          y: "-50%",
          autoAlpha: 0,
        });

        if (o > 1) {
          $(".JsScrollDown[direction='down']").show();
          $(".jsListWork li").removeClass("display"),
            TweenMax.to(t, 1, {
              autoAlpha: 0,
              y: "50%",
              ease: Power4.easeOut,
              onComplete: function () {
                isRunProject = true;
              },
            }),
            (screenHorizontal || ipadproHorizontal) &&
              $(".nano").nanoScroller({ scrollTop: 0 }),
            TweenMax.to($(".jsListWork li:eq(" + i + ")"), 1, {
              delay: 0.5,
              y: "0%",
              opacity: 1,
              visibility: "visible",
              ease: Power4.easeOut,
              onComplete: function () {
                (a = !1),
                  TweenMax.set($(".jsListWork li:eq(" + i + ")"), {
                    className: "+=display",
                  });
                isRunProject = false;
              },
            });
        }
        if (o == 2) {
          $(".JsScrollDown[direction='up']").hide();
          isRunProject = false;
        }
      }
      function Down() {
        var ItemActive = $(".jsListWork li.display");
        var o = $(ItemActive).index() + 1;
        var t = ItemActive;

        if (a || o < e) {
          $(".JsScrollDown[direction='up']").show();

          TweenMax.to(t, 1, {
            autoAlpha: 0,
            y: "-50%",
            ease: Power4.easeOut,
            onComplete: function () {
              (screenHorizontal || ipadproHorizontal) &&
                $(".nano").nanoScroller({ scrollTop: 0 });
              isRunProject = true;
            },
          }),
            TweenMax.to($(t).next(), 1, {
              delay: 0.5,
              y: "0%",
              opacity: 1,
              visibility: "visible",
              ease: Power4.easeOut,
              onComplete: function () {
                (a = !1),
                  TweenMax.set($(t).next(), { className: "+=display" }),
                  TweenMax.set($(t), { className: "-=display" }),
                  TweenMax.set($(".jsListWork li:not(.display)"), {
                    y: "50%",
                    autoAlpha: 0,
                  });
                isRunProject = false;
              },
            });
        }
        if (o == e - 1) {
          $(".JsScrollDown[direction='down']").hide();
          isRunProject = false;
        }
      }
    },
  },
  WORKDETAIL: {
    init: function () {
      var e,
        a = location.hash;
      if (((a = a.substring(1, a.length)), sw < 769))
        (t = $(".jsListWork")).animate({ scrollTop: 0 }, 0, function () {
          e = $("." + a).offset().top - 20;
        });
      else if (ipadproVertical) {
        var t;
        (t = $(".jsListWork")).animate({ scrollTop: 0 }, 0, function () {
          e = $("." + a).offset().top - 150;
        });
      }
      if (a != "" || a == "underfine") {
        $(".jsListWork li").removeClass("display");
        $('#'+a).addClass("display"),
          $(".ourProject").hasClass(".active") && $(".ourProject").removeClass("active"),
          (sw < 769 || ipadproVertical) && t.animate({ scrollTop: e }, 0);
      }
      // switch (a) {
      //   case "omolupin":
      //     $(".jsListWork li").removeClass("display"),
      //       $(".jsListWork li.omolupin").addClass("display"),
      //       $(".ourProject").hasClass(".active") &&
      //         $(".ourProject").removeClass("active"),
      //       (sw < 769 || ipadproVertical) && t.animate({ scrollTop: e }, 0);
      //     break;
      //   case "lifebuoy":
      //     $(".jsListWork li").removeClass("display"),
      //       $(".jsListWork li.lifebuoy").addClass("display"),
      //       $(".ourProject").hasClass(".active") &&
      //         $(".ourProject").removeClass("active"),
      //       (sw < 769 || ipadproVertical) && t.animate({ scrollTop: e }, 0);
      //     break;
      //   case "omo":
      //     $(".jsListWork li").removeClass("display"),
      //       $(".jsListWork li.omo").addClass("display"),
      //       $(".ourProject").hasClass(".active") &&
      //         $(".ourProject").removeClass("active"),
      //       (sw < 769 || ipadproVertical) && t.animate({ scrollTop: e }, 0);
      //     break;
      //   case "naturenz":
      //     $(".jsListWork li").removeClass("display"),
      //       $(".jsListWork li.naturenz").addClass("display"),
      //       $(".ourProject").hasClass("active") &&
      //         $(".ourProject").removeClass("active"),
      //       (sw < 769 || ipadproVertical) && t.animate({ scrollTop: e }, 0);
      //     break;
      //   case "swing":
      //     $(".jsListWork li").removeClass("display"),
      //       $(".jsListWork li.swing").addClass("display"),
      //       $(".ourProject").hasClass("active") &&
      //         $(".ourProject").removeClass("active"),
      //       (sw < 769 || ipadproVertical) && t.animate({ scrollTop: e }, 0);
      //     break;
      //   case "gardasil":
      //     $(".jsListWork li").removeClass("display"),
      //       $(".jsListWork li.gardasil").addClass("display"),
      //       $(".ourProject").hasClass("active") &&
      //         $(".ourProject").removeClass("active"),
      //       (sw < 769 || ipadproVertical) && t.animate({ scrollTop: e }, 0);
      //     break;
      //   case "beko":
      //     $(".jsListWork li").removeClass("display"),
      //       $(".jsListWork li.beko").addClass("display"),
      //       $(".ourProject").hasClass("active") &&
      //         $(".ourProject").removeClass("active"),
      //       (sw < 769 || ipadproVertical) && t.animate({ scrollTop: e }, 0);
      //     break;
      //   case "lazada":
      //     $(".jsListWork li").removeClass("display"),
      //       $(".jsListWork li.lazada").addClass("display"),
      //       $(".ourProject").hasClass("active") &&
      //         $(".ourProject").removeClass("active"),
      //       (sw < 769 || ipadproVertical) && t.animate({ scrollTop: e }, 0);
      //     break;
      //   case "sendo":
      //     $(".jsListWork li").removeClass("display"),
      //       $(".jsListWork li.sendo").addClass("display"),
      //       $(".ourProject").hasClass("active") &&
      //         $(".ourProject").removeClass("active"),
      //       (sw < 769 || ipadproVertical) && t.animate({ scrollTop: e }, 0);
      //     break;
      //   case "vinamilk":
      //     $(".jsListWork li").removeClass("display"),
      //       $(".jsListWork li.vinamilk").addClass("display"),
      //       $(".ourProject").hasClass("active") &&
      //         $(".ourProject").removeClass("active"),
      //       (sw < 769 || ipadproVertical) && t.animate({ scrollTop: e }, 0);
      //     break;
      //   case "omomotherday":
      //     $(".jsListWork li").removeClass("display"),
      //       $(".jsListWork li.omomotherday").addClass("display"),
      //       $(".ourProject").hasClass("active") &&
      //         $(".ourProject").removeClass("active"),
      //       (sw < 769 || ipadproVertical) && t.animate({ scrollTop: e }, 0);
      //     break;
      //   default:
      //     $(".jsListWork li").removeClass("display"),
      //       $(".jsListWork li:eq(0)").addClass("display"),
      //       $(".ourProject").hasClass("active") &&
      //         $(".ourProject").removeClass("active");
      // }
    },
  },
  CLIENT: {
    init: function () {
      var e = !1;
      $(".ourClient li").mouseenter(function () {
        e ||
          $(this).hasClass("gray") ||
          ((e = !1),
          $(".ourClient li").addClass("gray"),
          $(this).removeClass("gray"),
          sw > 1025 &&
            TweenMax.to(".jsCloud", 1, { scale: 2, autoAlpha: 0.6 }));
      }),
        $(".ourClient li").mouseleave(function () {
          e ||
            ((e = !1),
            $(".ourClient li").removeClass("gray"),
            sw > 1025 &&
              TweenMax.to(".jsCloud ", 1, { scale: 1, autoAlpha: 1 }));
        });
    },
  },
  FUNC: {
    hidePreloader: function () {
      var e = new TimelineLite();
      TweenMax.set("#pHome", { y: "30%", autoAlpha: 0 }),
        TweenMax.set(".jsCloud ", { x: sw / 2 + "px", y: "1200px" }),
        e
          .to(".jsPreLoader", 1, { autoAlpha: 0, scale: 0 })
          .to(".jsPreLoader .hanhtinh1", 1, { scale: 0, ease: Power4.easeOut }),
        setTimeout(() => {
          BY.ANI.homeAnimteIn();
        }, 500);
    },
    openMenu: function (e) {
      btnMenu = e;
      var a,
        t = new TimelineLite();
      TweenMax.killAll(),
        (a = sw > 1024 ? 200 : 50),
        (sw < 769 || ipadproVertical) && $(".leftBar").hide(),
        $(".jsBtnOurwork").removeClass("active"),
        $(".bar").css("overflow", "visible"),
        $(btnMenu).addClass("active"),
        BY.FUNC.hideCircle(),
        t
          .set(".main", { autoAlpha: 0 })
          .set(".elms, .ovl_bg", { autoAlpha: 1, ease: Power4.easeOut })
          .set(".barContain .item", { visibility: "hidden" })
          .set(".barContain .item:eq(0)", { visibility: "visible" })
          .set($("#nav li"), { y: a, autoAlpha: 0 })
          .set("#circleCanvas", { autoAlpha: 0.5 })
          .to(
            ".bar",
            1.2,
            { x: -xbar, ease: Expo.easeOut, onComplete: BY.FUNC.done() },
            "c"
          )
          .staggerTo(
            $("#nav li"),
            1,
            { y: 0, autoAlpha: 1, ease: Expo.easeOut },
            0.1,
            "c+=.2"
          );
    },
    closeMenu: function (e) {
      btnMenu = e;
      var a = new TimelineLite();
      TweenMax.killAll(),
        TweenMax.set("#circleCanvas, .ovl_bg, .elms", { autoAlpha: 0 }),
        (sw < 769 || ipadproVertical) && $(".leftBar").show(),
        a
          .set(".barContain .item", { visibility: "hidden" })
          .set(".main", { autoAlpha: 1 })
          .to(".bar", 0.7, {
            x: 0,
            ease: Expo.easeOut,
            onComplete: function () {
              BY.FUNC.done(),
                $(btnMenu).removeClass("active"),
                BY.FUNC.showCircle();
            },
          });
    },
    openOurProject: function (e) {
      btnOurProject = e;
      var a,
        t,
        o = new TimelineLite();
      BY.FUNC.hideCircle(),
        (screenHorizontal || ipadproHorizontal) &&
          $(".item .nano").nanoScroller({ scrollTop: 0 }),
        $(btnOurProject).addClass("active"),
        $("#jsBtnMenu").removeClass("active"),
        $(".bar").css("overflow", "visible"),
        (sw < 769 || ipadproVertical) && $(".leftBar").hide(),
        sw > 1024 ? ((a = 150), (t = 0)) : ((a = 50), (t = 0)),
        o
          .set(".main", { autoAlpha: 0 })
          .set(".ovl_bg, .elms", { autoAlpha: 1 })
          .set(".barContain .item", { visibility: "hidden" })
          .set(".barContain .item:eq(1)", { visibility: "visible" })
          .set($(".bar .ourWorkContent li"), { y: a, autoAlpha: t })
          .set("#circleCanvas", { autoAlpha: 0.5 })
          .to(
            ".bar",
            1.2,
            { x: -xbar, ease: Expo.easeOut, onComplete: BY.FUNC.done() },
            "d"
          )
          .staggerTo(
            $(".bar .ourWorkContent li"),
            0.5,
            { y: 0, autoAlpha: 1, ease: Power2.easeOut },
            0.1,
            "d+=.25"
          );
    },
    closeOurProject: function (e) {
      btnOurProject = e;
      var a = new TimelineLite();
      TweenMax.killAll(),
        (sw < 769 || ipadproVertical) && $(".leftBar").show(),
        TweenMax.set("#circleCanvas, .ovl_bg, .elms", { autoAlpha: 0 }),
        a
          .set(".barContain .item", { visibility: "hidden" })
          .set(".main", { autoAlpha: 1 })
          .to(".bar", 0.7, {
            x: 0,
            ease: Expo.easeOut,
            onComplete: function () {
              BY.FUNC.done(),
                $(btnOurProject).removeClass("active"),
                BY.FUNC.showCircle();
            },
          });
    },
    openSubMenuPageWork: function (e) {
      var a = new TimelineLite();
      (btnSubMenu = e),
        $(btnSubMenu).hasClass("active") ||
          $(btnSubMenu).hasClass("display") ||
          ($(btnSubMenu)
            .parents(".jsOurWork")
            .find("li")
            .removeClass("active")
            .addClass("disable"),
          $(btnSubMenu).removeClass("disable").addClass("active"),
          a
            .set($(btnSubMenu).find(".listWorks p"), { x: 100, autoAlpha: 0 })
            .set($(btnSubMenu).find(".listWorks"), { display: "block" })
            .staggerTo(
              $(btnSubMenu).find(".listWorks p"),
              1,
              { x: 0, autoAlpha: 1, ease: Power4.easeOut },
              0.1
            ));
    },
    closeSubMenuPageWork: function (e) {
      var a = new TimelineLite();
      (btnSubMenu = e),
        $(".jsOurWork li").removeClass("active").removeClass("disable"),
        a.set($(".listWorks"), { display: "none" });
    },
    openVideoDetail: function (e) {
      $(".mb .barLinks").hide(), BY.FUNC.hideCircle();
      var a = new TimelineLite();
      btnVideo = e;
      var t =
          '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' +
          $(btnVideo).attr("data") +
          '?autoplay=1&showinfo=0&rel=0&mute=1" frameborder="0" allowfullscreen></iframe>',
        o = $(btnVideo).attr("data-img");
      a.to(
        $(".leftBar"),
        0.5,
        { left: -130, autoAlpha: 0, ease: Power4.easeOut },
        "s"
      )
        .to($(".bar"), 0.5, { right: -130, ease: Power4.easeOut }, "s")
        .to(
          $(".videoDetail .left, #pCourseDetail .brand"),
          1.2,
          { x: "-150%", ease: Power4.easeOut },
          "s"
        )
        .to(
          $(".videoDetail .right, #pCourseDetail .copy"),
          1.2,
          { x: "150%", ease: Power4.easeOut },
          "s"
        )
        .to(
          $("#pCourseDetail .pageTitle"),
          1,
          {
            y: -150,
            ease: Power4.easeOut,
            onComplete:
              ($(".videoDetail .bg").attr("src", o),
              void $(".ytb")
                .html("")
                .append(t)
                .ready(function () {
                  TweenMax.set($(".videoDetail"), { display: "block" }),
                    TweenMax.to(".ytb ", 1, {
                      delay: 1,
                      autoAlpha: 1,
                      ease: Power4.easeOut,
                      onComplete: function () {
                        $(".videoDetail").css("z-index", "99999");
                      },
                    });
                })),
          },
          "s"
        )
        .to($(".btnCloseVideo"), 1, {
          scale: 1,
          autoAlpha: 1,
          ease: Back.easeOut,
        });
    },
    closeVideoDetail: function (e) {
      var a = new TimelineLite();
      (btnVideo = e),
        $(".ytb").html(""),
        a.to($(".ytb"), 0.5, { autoAlpha: 0, ease: Power4.easeOut }, "s").to(
          $(".jsCloseVideo"),
          0.5,
          {
            autoAlpha: 0,
            scale: 0,
            ease: Power4.easeOut,
            onComplete: function () {
              $(".videoDetail").css("z-index", "-1"),
                new TimelineLite()
                  .to(
                    $(".leftBar"),
                    0.5,
                    { left: 0, autoAlpha: 1, ease: Power4.easeOut },
                    "c"
                  )
                  .to($(".bar"), 0.5, { right: 0, ease: Power4.easeOut }, "c")
                  .to(
                    $(".videoDetail .left, #pCourseDetail .brand"),
                    1.2,
                    { x: "0%", ease: Power4.easeOut },
                    "c"
                  )
                  .to(
                    $(".videoDetail .right, #pCourseDetail .copy"),
                    1.2,
                    { x: "0%", ease: Power4.easeOut },
                    "c"
                  )
                  .to(
                    $("#pCourseDetail .pageTitle"),
                    1.2,
                    {
                      y: 0,
                      ease: Power4.easeOut,
                      onComplete: function () {
                        BY.FUNC.showCircle();
                      },
                    },
                    "c"
                  )
                  .set($(".videoDetail"), { display: "none" }),
                $(".mb .barLinks").show();
            },
          },
          "s"
        );
    },
    openGalleryDetail: function (e) {
      var a = new TimelineLite();
      (imgWrap = e),
        (data = $(imgWrap).parents(".brand").find(".jsGalleryDetail").clone()),
        $(".mb .barLinks").hide(),
        a
          .to(
            $(".leftBar"),
            0.5,
            { left: -130, autoAlpha: 0, ease: Power4.easeOut },
            "s"
          )
          .to($(".bar"), 0.5, { right: -130, ease: Power4.easeOut }, "s")
          .to(
            $(".jsGallery .left, #pCourseDetail .brand"),
            1.2,
            { x: "-150%", ease: Power4.easeOut },
            "s"
          )
          .to(
            $(".jsGallery .right, #pCourseDetail .copy"),
            1.2,
            { x: "150%", ease: Power4.easeOut },
            "s"
          )
          .to(
            $("#pCourseDetail .pageTitle"),
            1,
            { y: -150, ease: Power4.easeOut },
            "s"
          )
          .to($(".jsCloseGallery"), 1, {
            scale: 1,
            autoAlpha: 1,
            ease: Back.easeOut,
            onComplete: void $(".galleryDetail")
              .html("")
              .append(data)
              .ready(function () {
                TweenMax.set($(".jsGallery"), { display: "block" }),
                  TweenMax.to($(".jsGallery"), 0.5, {
                    autoAlpha: 1,
                    ease: Power4.easeOut,
                    onComplete: function () {
                      $(".jsGalleryDetail").slick({
                        infinite: !1,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        swipeToSlide: !0,
                        arrows: !1,
                        easing: "easeOutElastic",
                        prevArrow: $(".prev"),
                        nextArrow: $(".next"),
                        responsive: [
                          {
                            breakpoint: 769,
                            settings: { slidesToShow: 2, slidesToScroll: 2 },
                          },
                          {
                            breakpoint: 567,
                            settings: { slidesToShow: 1, slidesToScroll: 1 },
                          },
                        ],
                      }),
                        $(".jsGlrNext").click(function () {
                          $(".jsGalleryDetail").slick("slickNext");
                        }),
                        $(".jsGlrPrev").click(function () {
                          $(".jsGalleryDetail").slick("slickPrev");
                        }),
                        TweenMax.to(
                          ".jsGallery .hanhtinh2, .jsGallery .hanhtinh4, .jsGallery .char",
                          2,
                          { delay: 0.5, autoAlpha: 1, ease: Power4.easeOut }
                        );
                    },
                  });
              }),
          });
    },
    hideGalleryDetail: function (e) {
      var a = new TimelineLite();
      (imgWrap = e),
        $(".jsGalleryDetail").hasClass("slick-initialized") &&
          $(".jsGalleryDetail").slick("unslick"),
        a
          .to(
            ".jsGallery .hanhtinh2, .jsGallery .hanhtinh4, .jsGallery .char",
            1,
            { autoAlpha: 0, ease: Power4.easeOut },
            "s"
          )
          .to(
            $(".jsCloseGallery"),
            0.5,
            {
              autoAlpha: 0,
              scale: 0,
              ease: Power4.easeOut,
              onComplete: function () {
                new TimelineLite()
                  .set($(".jsGallery"), { display: "none" })
                  .to(
                    $(".leftBar"),
                    0.5,
                    { left: 0, autoAlpha: 1, ease: Power4.easeOut },
                    "c"
                  )
                  .to($(".bar"), 0.5, { right: 0, ease: Power4.easeOut }, "c")
                  .to(
                    $(".jsGallery .left, #pCourseDetail .brand"),
                    1.2,
                    { x: "0%", ease: Power4.easeOut },
                    "c"
                  )
                  .to(
                    $(".jsGallery .right, #pCourseDetail .copy"),
                    1.2,
                    { x: "0%", ease: Power4.easeOut },
                    "c"
                  )
                  .to(
                    $("#pCourseDetail .pageTitle"),
                    1.2,
                    { y: 0, ease: Power4.easeOut },
                    "c"
                  ),
                  $(".mb .barLinks").show();
              },
            },
            "s"
          );
    },
    showHideAstro: function () {
      var e = !1;
      $("#navMenu li").mouseenter(function () {
        if (!e && !$(this).hasClass("display")) {
          (e = !1), $(this).addClass("display");
          var a = $(this).attr("data");
          $(".astro .active div").css("background-image", `url('../images/whale2.png')`);
        }
      }),
        $("#navMenu li").mouseleave(function () {
          e ||
            ((e = !1),
            $("#navMenu li").removeClass("display")),
            $(".astro .active div").css("background-image", `url('../images/whale1.png')`)
        });
    },
    disableClick: function () {
      var e = document.querySelectorAll("a[href]");
      console.log(e);
      for (
        var a = function (a) {
            if (a.currentTarget.href === window.location.href)
              a.preventDefault(), a.stopPropagation();
            else if ($(e).hasClass("phone") || $(e).hasClass("email"))
              $(".ovlLink").hide();
            else {
              $(e).removeClass("active"),
                $(this).addClass("active"),
                $(".ovlLink").show();
              var t = $(this).attr("href");
              $('a[href="' + t + '"]').each(function () {
                $(this).addClass("active");
              });
            }
          },
          t = 0;
        t < e.length;
        t++
      )
        e[t].addEventListener("click", a);
    },
    onClickBtnHandler: function () {
      $("#jsBtnMenu").on("click", function () {
        isRun ||
          ((isRun = !0),
          $(this).hasClass("active")
            ? BY.FUNC.closeMenu(this)
            : BY.FUNC.openMenu(this));
      }),
        $(".jsBtnOurwork").on("click", function () {
          isRun ||
            ((isRun = !0),
            $(this).hasClass("active")
              ? BY.FUNC.closeOurProject(this)
              : BY.FUNC.openOurProject(this));
        }),
        $(".jsCloseBar").on("click", function () {
          $("#jsBtnMenu").hasClass("active")
            ? $("#jsBtnMenu").trigger("click")
            : $(".jsBtnOurwork").trigger("click");
        }),
        sw < 769 &&
          ($(document).on("touchstart", ".jsOurWork .hasSubMenu", function () {
            $(this).hasClass("active") ||
              ($(".jsOurWork li").removeClass("active").removeClass("disable"),
              TweenMax.set($(".listWorks"), { display: "none" }),
              BY.FUNC.openSubMenuPageWork(this));
          }),
          $(document).on("touchstart", ".jsOpenVideoDetail", function () {
            BY.FUNC.openVideoDetail(this);
          }),
          $(document).on("touchstart", ".jsCloseVideo", function () {
            BY.FUNC.closeVideoDetail(this);
          }),
          $(document).on("touchstart", ".jsOpenGalleryDetail", function () {
            BY.FUNC.openGalleryDetail(this);
          }),
          $(document).on("touchstart", ".jsCloseGallery", function () {
            BY.FUNC.hideGalleryDetail(this);
          })),
        $(document).on("mouseenter", ".jsOurWork .hasSubMenu", function () {
          BY.FUNC.openSubMenuPageWork(this);
        }),
        $(document).on("mouseleave", ".jsOurWork .hasSubMenu", function () {
          BY.FUNC.closeSubMenuPageWork(this);
        }),
        $(document).on("click", ".jsOpenVideoDetail", function () {
          BY.FUNC.openVideoDetail(this);
        }),
        $(document).on("click", ".jsCloseVideo", function () {
          BY.FUNC.closeVideoDetail(this);
        }),
        $(document).on("click", ".jsOpenGalleryDetail", function () {
          BY.FUNC.openGalleryDetail(this);
        }),
        $(document).on("click", ".jsCloseGallery", function () {
          BY.FUNC.hideGalleryDetail(this);
        });
    },
    hideCircle: function () {
      (isOverStage = !1),
        TweenMax.set(".jsCloud", {
          autoAlpha: 0,
          scale: 0,
          transformOrigin: "0% 0%",
        }),
        $(".homeElms .elm").addClass("run");
    },
    showCircle: function () {
      sw > 1025
        ? ($(".homeElms .elm").removeClass("run"),
          TweenMax.to(".jsCloud", 0.5, {
            autoAlpha: 1,
            scale: 1,
            transformOrigin: "0% 0%",
          }))
        : TweenMax.to(".jsCloud ", 2, {
            autoAlpha: 1,
            scale: 1,
            x: sw / 2 + "px",
            y: sh / 2 + "px",
            transformOrigin: "0% 0%",
            ease: Power4.easeOut,
          });
    },
    disableHoverOnMobile: function () {
      if (
        "ontouchstart" in document.documentElement ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      )
        try {
          for (var e in document.styleSheets) {
            var a = document.styleSheets[e];
            if (a.rules)
              for (var t = a.rules.length - 1; t >= 0; t--)
                a.rules[t].selectorText &&
                  a.rules[t].selectorText.match(":hover") &&
                  a.deleteRule(t);
          }
        } catch (e) {}
    },
    done: function () {
      isRun = !1;
    },
    donechuyentrang: function () {
      setTimeout(function () {
        chuyentrang = !1;
      }, 100);
    },
  },
  ANI: {
    homeAnimteIn: function (e) {
      return (
        new TimelineLite()
          .to(
            ".jsCloud ",
            2,
            {
              x: sw / 2 + "px",
              y: sh / 2 + "px",
              ease: Power4.easeOut,
              onComplete: function () {
                BY.clound();
              },
            },
            "s"
          )
          .to(
            $("#pHome"),
            1,
            {
              y: "0%",
              autoAlpha: 1,
              ease: Power4.easeOut,
              onComplete: function () {
                BY.FUNC.donechuyentrang(),
                  sw > 1024 && sh < 1200
                    ? (BY.NAV.init(),
                      $("#navMenu").on("mouseenter", function () {
                        BY.FUNC.hideCircle();
                      }),
                      $("#navMenu").on("mouseleave", function () {
                        BY.FUNC.showCircle();
                      }))
                    : $(".homeElms .elm").addClass("run"),
                  (ipadproHorizontal || ipadproVertical) &&
                    $(".homeElms .elm").addClass("run");
              },
            },
            "s"
          ),
        e
      );
    },
  },
  clound: function () {
    (_cursorWrapper = document.querySelector(".jsCloud")),
      document.addEventListener("mousemove", (e) => {
        (this.clientX = Math.floor(e.clientX)),
          (this.clientY = Math.floor(e.clientY));
      }),
      document.addEventListener("click", (e) => {
        (this.clientX = Math.floor(e.clientX)),
          (this.clientY = Math.floor(e.clientY));
      }),
      sw < 1025 &&
        TweenMax.to(".jsCloud ", 2, {
          x: sw / 2 + "px",
          y: sh / 2 + "px",
          ease: Power4.easeOut,
        });
    var e = () => {
      (isOverStage = !0) &&
        TweenMax.to(_cursorWrapper, 0.7, { x: this.clientX, y: this.clientY }),
        requestAnimationFrame(e);
    };
    requestAnimationFrame(e);
  },
  makeStars: function () {},
};
BY.init();

$('.logo').mouseenter( function(){
  $(this).toggleClass('hover');
  $(this).find('img').attr('src', 'images/logo.png');
});
$('.logo').mouseleave( function (){
  $(this).toggleClass('hover');
  $(this).find('img').attr('src', 'images/logo-light.png');
});
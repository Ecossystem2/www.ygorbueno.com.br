/*! For license information please see main.bundle.js.LICENSE.txt */
(() => {
    var e, t = {
            4435: (e, t, n) => {
                "use strict";

                function o(e) {
                    return o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, o(e)
                }

                function a(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }

                function r(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, c(o.key), o)
                    }
                }

                function i(e, t, n) {
                    return t && r(e.prototype, t), n && r(e, n), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), e
                }

                function c(e) {
                    var t = function(e, t) {
                        if ("object" != o(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var a = n.call(e, "string");
                            if ("object" != o(a)) return a;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == o(t) ? t : String(t)
                }
                var l, s = 2147483647,
                    d = function() {
                        function e(t, n, o) {
                            a(this, e), this.mouse_over_progressbar = !1, this.title_jumped = !1, this.sections = [], this.moments = [], this.el_pbar = document.querySelector(n), this.el_body = document.querySelector(t), this.el_body.style.pointerEvents = "none", this.video_length = o.videoLength, this.ev_config = o, this.c_width = this.el_body.clientWidth - 1, this.createElements(), this.startResizeMonitoring()
                        }
                        return i(e, [{
                            key: "updateLengthForLiveStream",
                            value: function(e) {
                                this.video_length = e, this.resizeSections()
                            }
                        }, {
                            key: "reloadChapters",
                            value: function() {
                                for (; this.el_root.firstChild;) this.el_root.removeChild(this.el_root.firstChild);
                                if (this.sections = [], null == this.ev_config.chapters || 0 == this.ev_config.chapters.length) {
                                    var e = new m(this, 0, s, "", !1);
                                    this.sections.push(e), this.el_root.appendChild(e.GetElement())
                                } else {
                                    var t = 0;
                                    this.ev_config.chapters.sort(u.compare);
                                    for (var n = 0; n < this.ev_config.chapters.length; n++) {
                                        var o = this.ev_config.chapters[n];
                                        o.start > t && (e = new m(this, t, o.start, "", !1), this.sections.push(e), this.el_root.appendChild(e.GetElement())), o.start < t && (o.start = t), e = new m(this, o.start, o.end, o.title, !0), this.sections.push(e), this.el_root.appendChild(e.GetElement()), t = o.end
                                    }
                                }
                            }
                        }, {
                            key: "createElements",
                            value: function() {
                                this.el_base = document.createElement("div"), this.el_base.className = "sp__base", this.el_root = document.createElement("ul"), this.el_root.className = "sp__progressbar", this.el_title = document.createElement("div"), this.el_title.className = "sp__title", this.el_title.textContent = "test", this.el_base.appendChild(this.el_root), this.el_base.appendChild(this.el_title), this.el_body.appendChild(this.el_base), this.reloadChapters();
                                for (var e = 0; e < this.ev_config.moments.length; e++) {
                                    var t = this.ev_config.moments[e],
                                        n = new p(this, t.timestamp, t.title);
                                    this.el_base.appendChild(n.GetElement()), this.moments.push(n), n.Reposition()
                                }
                                var o = this;

                                function a(e) {
                                    var t = e.touches[0] || e.changedTouches[0],
                                        n = e.target.parentNode.getBoundingClientRect();
                                    o.mouse_x = t.pageX - n.left + 6, o.mouse_y = t.pageY - n.top, o.mouse_over_progressbar = !0, o.el_root.classList.contains("hover") || o.el_root.classList.add("hover");
                                    var a = o.getCurrentMouseSecnds();
                                    o.DetectHoverMoments(a), o.moment_active || o.DetectHoverSection(a), o.updateSections("mark", a), o.CallThumbnailJumpDownEvent(), o.CallThumbnailJumpUpEvent(), null == o.c_highlightedSection || o.moment_active || o.PositionTitleAndIndicator(a);
                                    var r = document.querySelector(".plyr__preview-thumb"),
                                        i = document.querySelector(".plyr__preview-thumb__time-container span");
                                    if (r.classList.contains("plyr__tooltip--drag") || r.classList.add("plyr__tooltip--drag"), i.textContent = o.secondsToTimeString(a), null != o.ev_config.onScrubbingChange && o.ev_config.onScrubbingChange(o.getCurrentMouseSecnds(), o.SecondsToPixels(o.getCurrentMouseSecnds())), "touchend" === e.type) {
                                        o.mouse_over_progressbar = !1, o.updateSections("mark", 0);
                                        for (var c = 0; c < o.sections.length; c++) o.sections[c].section_interactive && (o.sections[c].HideTitle(), o.sections[c].SetInactive());
                                        r.classList.remove("plyr__tooltip--drag"), i.textContent = o.secondsToTimeString(o.c_progress), null != o.ev_config.onScrubbingChange && o.ev_config.onScrubbingChange(o.getCurrentMouseSecnds(), o.SecondsToPixels(o.getCurrentMouseSecnds()))
                                    }
                                }
                                this.el_pbar.addEventListener("mousemove", (function(e) {
                                    var t = o.el_pbar.parentNode.getBoundingClientRect();
                                    o.mouse_x = e.clientX - t.left + 6, o.mouse_y = e.clientY - t.top, o.mouse_over_progressbar = !0, o.el_root.classList.contains("hover") || o.el_root.classList.add("hover"), o.el_title.classList.remove("animated");
                                    var n = o.getCurrentMouseSecnds();
                                    o.DetectHoverMoments(n), o.moment_active || o.DetectHoverSection(n), o.updateSections("mark", n), o.CallThumbnailJumpDownEvent(), o.CallThumbnailJumpUpEvent(), null == o.c_highlightedSection || o.moment_active || o.PositionTitleAndIndicator(n)
                                })), this.el_pbar.addEventListener("mouseleave", (function(e) {
                                    o.el_title.classList.contains("animated") || o.el_title.classList.add("animated"), o.mouse_over_progressbar = !1, o.DetectHoverMoments(-1e4), o.el_root.classList.remove("hover"), o.updateSections("mark", 0), o.c_timeoutEvent = void 0, clearInterval(o.c_timeout)
                                })), this.el_pbar.addEventListener("touchmove", a.bind(this)), this.el_pbar.addEventListener("touchstart", a.bind(this)), this.el_pbar.addEventListener("touchend", a.bind(this))
                            }
                        }, {
                            key: "IsMobile",
                            value: function() {
                                var e, t = !1;
                                return e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0), t
                            }
                        }, {
                            key: "SetDuration",
                            value: function(e) {
                                this.video_length = e, this.resizeSections()
                            }
                        }, {
                            key: "SecondsToPixels",
                            value: function(e) {
                                return this.c_width / this.video_length * e
                            }
                        }, {
                            key: "PixelsToSeconds",
                            value: function(e) {
                                return e / (this.c_width / this.video_length)
                            }
                        }, {
                            key: "SetCurrentProgress",
                            value: function(e) {
                                this.updateSections("progress", e), this.c_progress = e, this.mouse_over_progressbar || this.moment_active || (this.moment_active || this.DetectHoverSection(e), null != this.c_highlightedSection && this.PositionTitleAndIndicator(this.c_highlightedSection.section_start + (this.c_highlightedSection.section_end - this.c_highlightedSection.section_start) / 2))
                            }
                        }, {
                            key: "SetBufferProgress",
                            value: function(e) {
                                this.updateSections("buffer", e)
                            }
                        }, {
                            key: "DetectHoverSection",
                            value: function(e) {
                                if (!this.moment_active) {
                                    for (var t = null, n = 0; n < this.sections.length; n++) this.sections[n].section_interactive && (this.sections[n].section_start <= e && this.sections[n].section_end > e ? t = this.sections[n] : (this.sections[n].HideTitle(), this.sections[n].SetInactive()));
                                    if (null != t) return t.ShowTitle(), t.SetActive(), this.c_highlightedSection = t, !0;
                                    this.c_highlightedSection = null
                                }
                                return !1
                            }
                        }, {
                            key: "DetectHoverMoments",
                            value: function(e) {
                                for (var t = null, n = 0; n < this.moments.length; n++) {
                                    var o = this.PixelsToSeconds(12);
                                    this.moments[n].moment_timestamp - o < e && this.moments[n].moment_timestamp + o > e ? t = this.moments[n] : this.moments[n].RemoveHover()
                                }
                                return null != t ? (t.ShowTitle(), this.c_highlightedMoment = t, !0) : (null != this.c_highlightedMoment && this.c_highlightedMoment.HideTitle(), this.c_highlightedSection = null, !1)
                            }
                        }, {
                            key: "PositionTitleAndIndicator",
                            value: function(e) {
                                var t = Math.max(this.SecondsToPixels(e) - this.el_title.clientWidth / 2, 0);
                                t = Math.min(t, this.el_root.clientWidth - this.el_title.clientWidth), this.el_title.style.left = t + "px"
                            }
                        }, {
                            key: "updateSections",
                            value: function(e, t) {
                                for (var n = 0; n < this.sections.length; n++) this.sections[n].SetMark(e, t)
                            }
                        }, {
                            key: "resizeSections",
                            value: function() {
                                for (var e = 0; e < this.sections.length; e++) this.sections[e].Resize();
                                for (e = 0; e < this.moments.length; e++) this.moments[e].Reposition()
                            }
                        }, {
                            key: "secondsToTimeString",
                            value: function(e) {
                                var t = Math.floor(e / 60),
                                    n = Math.floor(e % 60);
                                t < 0 && (t = 0), n < 0 && (n = 0);
                                var o = t.toString(),
                                    a = n.toString();
                                return o.length < 2 && (o = "0" + o), a.length < 2 && (a = "0" + a), o + ":" + a
                            }
                        }, {
                            key: "getCurrentMouseSecnds",
                            value: function() {
                                return this.mouse_x / (this.c_width / this.video_length)
                            }
                        }, {
                            key: "startResizeMonitoring",
                            value: function() {
                                var e = this;
                                setInterval((function() {
                                    var t = e.c_width;
                                    e.c_width = e.el_body.clientWidth - 1, e.c_width != t && e.resizeSections()
                                }), 100)
                            }
                        }, {
                            key: "CallThumbnailJumpUpEvent",
                            value: function(e) {
                                void 0 === e && (e = !1), this.title_jumped || !this.moment_active && !this.IsThumbnailInTitleHitBox() || (document.querySelector(".plyr__preview-thumb").style.bottom = "45px")
                            }
                        }, {
                            key: "CallThumbnailJumpDownEvent",
                            value: function(e) {
                                void 0 === e && (e = !1), !this.title_jumped || this.IsThumbnailInTitleHitBox() || this.moment_active || (document.querySelector(".plyr__preview-thumb").style.bottom = "22px")
                            }
                        }, {
                            key: "IsThumbnailInTitleHitBox",
                            value: function() {
                                if (this.moment_active) return this.title_jumped = !0, !0;
                                var e = this.el_title.getBoundingClientRect().left,
                                    t = this.el_title.classList.contains("active");
                                if (e < -50 || !t) return this.title_jumped = !1, !1;
                                var n = document.querySelector(".plyr__preview-thumb").getBoundingClientRect(),
                                    o = this.el_title.getBoundingClientRect();
                                return o.left + o.width < n.left ? (this.title_jumped = !1, !1) : n.left + n.width > o.left ? (this.title_jumped = !0, !0) : (this.title_jumped = !1, !1)
                            }
                        }]), e
                    }(),
                    u = function() {
                        function e() {
                            a(this, e)
                        }
                        return i(e, null, [{
                            key: "compare",
                            value: function(e, t) {
                                return e.start - t.start
                            }
                        }]), e
                    }(),
                    p = function() {
                        function e(t, n, o) {
                            a(this, e), this.pb = t, this.el_body = document.createElement("div"), this.el_body.className = "sp__moment", this.moment_timestamp = n, this.moment_title = o, this.Reposition()
                        }
                        return i(e, [{
                            key: "Reposition",
                            value: function() {
                                this.el_body.style.left = "".concat(this.pb.SecondsToPixels(this.moment_timestamp) - 6, "px")
                            }
                        }, {
                            key: "GetElement",
                            value: function() {
                                return this.el_body
                            }
                        }, {
                            key: "ShowTitle",
                            value: function() {
                                this.el_body.classList.contains("hover") || this.el_body.classList.add("hover"), this.pb.PositionTitleAndIndicator(this.moment_timestamp), this.pb.moment_active || (this.pb.moment_active = !0, "" != this.moment_title && this.pb.CallThumbnailJumpUpEvent(), this.pb.el_title.classList.add("active")), this.pb.el_title.textContent = this.moment_title
                            }
                        }, {
                            key: "HideTitle",
                            value: function() {
                                if (this.pb.moment_active) {
                                    this.RemoveHover(), this.pb.PositionTitleAndIndicator(this.moment_timestamp);
                                    for (var e = 0; e < this.pb.sections.length; e++) this.pb.sections[e].section_interactive && this.pb.sections[e].SetInactive();
                                    this.pb.moment_active = !1, this.pb.DetectHoverSection(this.moment_timestamp) ? this.pb.el_title.textContent = this.pb.c_highlightedSection.section_title : (this.pb.el_title.textContent = "", this.pb.el_title.classList.remove("active"), "" != this.moment_title && (this.pb.title_jumped = !0, this.pb.CallThumbnailJumpDownEvent(!0)))
                                }
                            }
                        }, {
                            key: "RemoveHover",
                            value: function() {
                                this.el_body.classList.remove("hover")
                            }
                        }]), e
                    }(),
                    m = function() {
                        function e(t, n, o, r, i) {
                            a(this, e), this.bars = {}, this.pb = t, this.section_start = n, this.section_end = o, this.section_interactive = i, this.section_title = r, this.el_body = document.createElement("li"), i && this.el_body.classList.add("interactive"), this.el_container = document.createElement("div"), this.el_container.className = "sp__container", this.el_bg = document.createElement("div"), this.el_bg.className = "sp__bg", this.el_body.append(this.el_container), this.el_container.append(this.el_bg);
                            var c = new f(this, 1, "#ffffff88");
                            this.bars.mark = c, this.el_container.append(c.GetElement());
                            var l = new f(this, 2, "#ffffff50");
                            this.bars.buffer = l, this.el_container.append(l.GetElement());
                            var s = new f(this, 3, "var(--plyr-color-main)");
                            this.bars.progress = s, this.el_container.append(s.GetElement()), this.Resize()
                        }
                        return i(e, [{
                            key: "SetInactive",
                            value: function() {
                                this.el_body.classList.remove("active")
                            }
                        }, {
                            key: "SetActive",
                            value: function() {
                                this.el_body.classList.contains("active") || this.el_body.classList.add("active")
                            }
                        }, {
                            key: "HideTitle",
                            value: function() {
                                this.c_titleShown && (this.pb.el_title.textContent = "", this.pb.el_title.classList.remove("active"), "" != this.section_title && this.pb.CallThumbnailJumpDownEvent()), this.c_titleShown = !1
                            }
                        }, {
                            key: "ShowTitle",
                            value: function() {
                                this.c_titleShown || (this.section_interactive && !this.pb.el_title.classList.contains("active") && (this.pb.el_title.classList.add("active"), "" != this.section_title && this.pb.CallThumbnailJumpUpEvent()), this.pb.el_title.textContent = this.section_interactive ? this.section_title : "", this.c_titleShown = !0)
                            }
                        }, {
                            key: "Resize",
                            value: function() {
                                var e = this.section_end == s ? this.pb.video_length : this.section_end,
                                    t = this.pb.SecondsToPixels(e - this.section_start);
                                for (var n in this.el_body.style.width = "".concat(t, "px"), this.c_width = t, this.bars) this.bars[n].Measure()
                            }
                        }, {
                            key: "SetMark",
                            value: function(e, t) {
                                this.bars[e].SetMark(t)
                            }
                        }, {
                            key: "GetElement",
                            value: function() {
                                return this.el_body
                            }
                        }]), e
                    }(),
                    f = function() {
                        function e(t, n, o) {
                            a(this, e), this.section = t, this.c_zindex = n, this.c_color = o, this.el_body = document.createElement("div"), this.el_body.className = "sp__section", this.el_body.style.backgroundColor = this.c_color, this.el_body.style.zIndex = this.c_zindex, this.el_body.style.width = "0", this.Measure()
                        }
                        return i(e, [{
                            key: "SetMark",
                            value: function(e) {
                                if (e <= this.section.section_start) this.el_body.style.width = "0";
                                else {
                                    var t = this.section.pb.SecondsToPixels(this.section.section_start),
                                        n = this.section.pb.SecondsToPixels(e) - t;
                                    this.el_body.style.width = "".concat(Math.min(n, this.c_width), "px")
                                }
                            }
                        }, {
                            key: "Measure",
                            value: function() {
                                var e = this.section.section_end == s ? this.section.pb.video_length : this.section.section_end;
                                this.c_width = this.section.pb.SecondsToPixels(e - this.section.section_start)
                            }
                        }, {
                            key: "GetElement",
                            value: function() {
                                return this.el_body
                            }
                        }]), e
                    }(),
                    y = n(3041),
                    h = n(1443),
                    v = n.n(h),
                    g = (n(6251), n(5751));

                function b(e) {
                    return b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, b(e)
                }

                function w(e, t) {
                    if (e) {
                        if ("string" == typeof e) return _(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _(e, t) : void 0
                    }
                }

                function _(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
                    return o
                }

                function C(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable
                        }))), n.push.apply(n, o)
                    }
                    return n
                }

                function k(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? C(Object(n), !0).forEach((function(t) {
                            x(e, t, n[t])
                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : C(Object(n)).forEach((function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                        }))
                    }
                    return e
                }

                function x(e, t, n) {
                    var o;
                    return o = function(e, t) {
                        if ("object" != b(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var o = n.call(e, "string");
                            if ("object" != b(o)) return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(t), (t = "symbol" == b(o) ? o : String(o)) in e ? Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = n, e
                }

                function E(e) {
                    var t, n, o, a = {},
                        r = function(e, t) {
                            var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                            if (!n) {
                                if (Array.isArray(e) || (n = w(e))) {
                                    n && (e = n);
                                    var o = 0,
                                        a = function() {};
                                    return {
                                        s: a,
                                        n: function() {
                                            return o >= e.length ? {
                                                done: !0
                                            } : {
                                                done: !1,
                                                value: e[o++]
                                            }
                                        },
                                        e: function(e) {
                                            throw e
                                        },
                                        f: a
                                    }
                                }
                                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                            }
                            var r, i = !0,
                                c = !1;
                            return {
                                s: function() {
                                    n = n.call(e)
                                },
                                n: function() {
                                    var e = n.next();
                                    return i = e.done, e
                                },
                                e: function(e) {
                                    c = !0, r = e
                                },
                                f: function() {
                                    try {
                                        i || null == n.return || n.return()
                                    } finally {
                                        if (c) throw r
                                    }
                                }
                            }
                        }(new URLSearchParams(e).entries());
                    try {
                        for (r.s(); !(t = r.n()).done;) {
                            var i = (n = t.value, o = 2, function(e) {
                                    if (Array.isArray(e)) return e
                                }(n) || function(e, t) {
                                    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                    if (null != n) {
                                        var o, a, r, i, c = [],
                                            l = !0,
                                            s = !1;
                                        try {
                                            if (r = (n = n.call(e)).next, 0 === t) {
                                                if (Object(n) !== n) return;
                                                l = !1
                                            } else
                                                for (; !(l = (o = r.call(n)).done) && (c.push(o.value), c.length !== t); l = !0);
                                        } catch (e) {
                                            s = !0, a = e
                                        } finally {
                                            try {
                                                if (!l && null != n.return && (i = n.return(), Object(i) !== i)) return
                                            } finally {
                                                if (s) throw a
                                            }
                                        }
                                        return c
                                    }
                                }(n, o) || w(n, o) || function() {
                                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                }()),
                                c = i[0],
                                l = i[1];
                            a[c] = l
                        }
                    } catch (e) {
                        r.e(e)
                    } finally {
                        r.f()
                    }
                    return a
                }

                function T(e) {
                    return T = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, T(e)
                }

                function S(e) {
                    return function(e) {
                        if (Array.isArray(e)) return R(e)
                    }(e) || function(e) {
                        if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                    }(e) || O(e) || function() {
                        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()
                }

                function L(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable
                        }))), n.push.apply(n, o)
                    }
                    return n
                }

                function I(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? L(Object(n), !0).forEach((function(t) {
                            M(e, t, n[t])
                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : L(Object(n)).forEach((function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                        }))
                    }
                    return e
                }

                function M(e, t, n) {
                    var o;
                    return o = function(e, t) {
                        if ("object" != T(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var o = n.call(e, "string");
                            if ("object" != T(o)) return o;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(t), (t = "symbol" == T(o) ? o : String(o)) in e ? Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = n, e
                }

                function P() {
                    P = function() {
                        return t
                    };
                    var e, t = {},
                        n = Object.prototype,
                        o = n.hasOwnProperty,
                        a = Object.defineProperty || function(e, t, n) {
                            e[t] = n.value
                        },
                        r = "function" == typeof Symbol ? Symbol : {},
                        i = r.iterator || "@@iterator",
                        c = r.asyncIterator || "@@asyncIterator",
                        l = r.toStringTag || "@@toStringTag";

                    function s(e, t, n) {
                        return Object.defineProperty(e, t, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }), e[t]
                    }
                    try {
                        s({}, "")
                    } catch (e) {
                        s = function(e, t, n) {
                            return e[t] = n
                        }
                    }

                    function d(e, t, n, o) {
                        var r = t && t.prototype instanceof v ? t : v,
                            i = Object.create(r.prototype),
                            c = new A(o || []);
                        return a(i, "_invoke", {
                            value: S(e, n, c)
                        }), i
                    }

                    function u(e, t, n) {
                        try {
                            return {
                                type: "normal",
                                arg: e.call(t, n)
                            }
                        } catch (e) {
                            return {
                                type: "throw",
                                arg: e
                            }
                        }
                    }
                    t.wrap = d;
                    var p = "suspendedStart",
                        m = "suspendedYield",
                        f = "executing",
                        y = "completed",
                        h = {};

                    function v() {}

                    function g() {}

                    function b() {}
                    var w = {};
                    s(w, i, (function() {
                        return this
                    }));
                    var _ = Object.getPrototypeOf,
                        C = _ && _(_(q([])));
                    C && C !== n && o.call(C, i) && (w = C);
                    var k = b.prototype = v.prototype = Object.create(w);

                    function x(e) {
                        ["next", "throw", "return"].forEach((function(t) {
                            s(e, t, (function(e) {
                                return this._invoke(t, e)
                            }))
                        }))
                    }

                    function E(e, t) {
                        function n(a, r, i, c) {
                            var l = u(e[a], e, r);
                            if ("throw" !== l.type) {
                                var s = l.arg,
                                    d = s.value;
                                return d && "object" == T(d) && o.call(d, "__await") ? t.resolve(d.__await).then((function(e) {
                                    n("next", e, i, c)
                                }), (function(e) {
                                    n("throw", e, i, c)
                                })) : t.resolve(d).then((function(e) {
                                    s.value = e, i(s)
                                }), (function(e) {
                                    return n("throw", e, i, c)
                                }))
                            }
                            c(l.arg)
                        }
                        var r;
                        a(this, "_invoke", {
                            value: function(e, o) {
                                function a() {
                                    return new t((function(t, a) {
                                        n(e, o, t, a)
                                    }))
                                }
                                return r = r ? r.then(a, a) : a()
                            }
                        })
                    }

                    function S(t, n, o) {
                        var a = p;
                        return function(r, i) {
                            if (a === f) throw new Error("Generator is already running");
                            if (a === y) {
                                if ("throw" === r) throw i;
                                return {
                                    value: e,
                                    done: !0
                                }
                            }
                            for (o.method = r, o.arg = i;;) {
                                var c = o.delegate;
                                if (c) {
                                    var l = L(c, o);
                                    if (l) {
                                        if (l === h) continue;
                                        return l
                                    }
                                }
                                if ("next" === o.method) o.sent = o._sent = o.arg;
                                else if ("throw" === o.method) {
                                    if (a === p) throw a = y, o.arg;
                                    o.dispatchException(o.arg)
                                } else "return" === o.method && o.abrupt("return", o.arg);
                                a = f;
                                var s = u(t, n, o);
                                if ("normal" === s.type) {
                                    if (a = o.done ? y : m, s.arg === h) continue;
                                    return {
                                        value: s.arg,
                                        done: o.done
                                    }
                                }
                                "throw" === s.type && (a = y, o.method = "throw", o.arg = s.arg)
                            }
                        }
                    }

                    function L(t, n) {
                        var o = n.method,
                            a = t.iterator[o];
                        if (a === e) return n.delegate = null, "throw" === o && t.iterator.return && (n.method = "return", n.arg = e, L(t, n), "throw" === n.method) || "return" !== o && (n.method = "throw", n.arg = new TypeError("The iterator does not provide a '" + o + "' method")), h;
                        var r = u(a, t.iterator, n.arg);
                        if ("throw" === r.type) return n.method = "throw", n.arg = r.arg, n.delegate = null, h;
                        var i = r.arg;
                        return i ? i.done ? (n[t.resultName] = i.value, n.next = t.nextLoc, "return" !== n.method && (n.method = "next", n.arg = e), n.delegate = null, h) : i : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, h)
                    }

                    function I(e) {
                        var t = {
                            tryLoc: e[0]
                        };
                        1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
                    }

                    function M(e) {
                        var t = e.completion || {};
                        t.type = "normal", delete t.arg, e.completion = t
                    }

                    function A(e) {
                        this.tryEntries = [{
                            tryLoc: "root"
                        }], e.forEach(I, this), this.reset(!0)
                    }

                    function q(t) {
                        if (t || "" === t) {
                            var n = t[i];
                            if (n) return n.call(t);
                            if ("function" == typeof t.next) return t;
                            if (!isNaN(t.length)) {
                                var a = -1,
                                    r = function n() {
                                        for (; ++a < t.length;)
                                            if (o.call(t, a)) return n.value = t[a], n.done = !1, n;
                                        return n.value = e, n.done = !0, n
                                    };
                                return r.next = r
                            }
                        }
                        throw new TypeError(T(t) + " is not iterable")
                    }
                    return g.prototype = b, a(k, "constructor", {
                        value: b,
                        configurable: !0
                    }), a(b, "constructor", {
                        value: g,
                        configurable: !0
                    }), g.displayName = s(b, l, "GeneratorFunction"), t.isGeneratorFunction = function(e) {
                        var t = "function" == typeof e && e.constructor;
                        return !!t && (t === g || "GeneratorFunction" === (t.displayName || t.name))
                    }, t.mark = function(e) {
                        return Object.setPrototypeOf ? Object.setPrototypeOf(e, b) : (e.__proto__ = b, s(e, l, "GeneratorFunction")), e.prototype = Object.create(k), e
                    }, t.awrap = function(e) {
                        return {
                            __await: e
                        }
                    }, x(E.prototype), s(E.prototype, c, (function() {
                        return this
                    })), t.AsyncIterator = E, t.async = function(e, n, o, a, r) {
                        void 0 === r && (r = Promise);
                        var i = new E(d(e, n, o, a), r);
                        return t.isGeneratorFunction(n) ? i : i.next().then((function(e) {
                            return e.done ? e.value : i.next()
                        }))
                    }, x(k), s(k, l, "Generator"), s(k, i, (function() {
                        return this
                    })), s(k, "toString", (function() {
                        return "[object Generator]"
                    })), t.keys = function(e) {
                        var t = Object(e),
                            n = [];
                        for (var o in t) n.push(o);
                        return n.reverse(),
                            function e() {
                                for (; n.length;) {
                                    var o = n.pop();
                                    if (o in t) return e.value = o, e.done = !1, e
                                }
                                return e.done = !0, e
                            }
                    }, t.values = q, A.prototype = {
                        constructor: A,
                        reset: function(t) {
                            if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(M), !t)
                                for (var n in this) "t" === n.charAt(0) && o.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = e)
                        },
                        stop: function() {
                            this.done = !0;
                            var e = this.tryEntries[0].completion;
                            if ("throw" === e.type) throw e.arg;
                            return this.rval
                        },
                        dispatchException: function(t) {
                            if (this.done) throw t;
                            var n = this;

                            function a(o, a) {
                                return c.type = "throw", c.arg = t, n.next = o, a && (n.method = "next", n.arg = e), !!a
                            }
                            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                                var i = this.tryEntries[r],
                                    c = i.completion;
                                if ("root" === i.tryLoc) return a("end");
                                if (i.tryLoc <= this.prev) {
                                    var l = o.call(i, "catchLoc"),
                                        s = o.call(i, "finallyLoc");
                                    if (l && s) {
                                        if (this.prev < i.catchLoc) return a(i.catchLoc, !0);
                                        if (this.prev < i.finallyLoc) return a(i.finallyLoc)
                                    } else if (l) {
                                        if (this.prev < i.catchLoc) return a(i.catchLoc, !0)
                                    } else {
                                        if (!s) throw new Error("try statement without catch or finally");
                                        if (this.prev < i.finallyLoc) return a(i.finallyLoc)
                                    }
                                }
                            }
                        },
                        abrupt: function(e, t) {
                            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                                var a = this.tryEntries[n];
                                if (a.tryLoc <= this.prev && o.call(a, "finallyLoc") && this.prev < a.finallyLoc) {
                                    var r = a;
                                    break
                                }
                            }
                            r && ("break" === e || "continue" === e) && r.tryLoc <= t && t <= r.finallyLoc && (r = null);
                            var i = r ? r.completion : {};
                            return i.type = e, i.arg = t, r ? (this.method = "next", this.next = r.finallyLoc, h) : this.complete(i)
                        },
                        complete: function(e, t) {
                            if ("throw" === e.type) throw e.arg;
                            return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), h
                        },
                        finish: function(e) {
                            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                var n = this.tryEntries[t];
                                if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), M(n), h
                            }
                        },
                        catch: function(e) {
                            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                var n = this.tryEntries[t];
                                if (n.tryLoc === e) {
                                    var o = n.completion;
                                    if ("throw" === o.type) {
                                        var a = o.arg;
                                        M(n)
                                    }
                                    return a
                                }
                            }
                            throw new Error("illegal catch attempt")
                        },
                        delegateYield: function(t, n, o) {
                            return this.delegate = {
                                iterator: q(t),
                                resultName: n,
                                nextLoc: o
                            }, "next" === this.method && (this.arg = e), h
                        }
                    }, t
                }

                function A(e, t, n, o, a, r, i) {
                    try {
                        var c = e[r](i),
                            l = c.value
                    } catch (e) {
                        return void n(e)
                    }
                    c.done ? t(l) : Promise.resolve(l).then(o, a)
                }

                function q(e) {
                    return function() {
                        var t = this,
                            n = arguments;
                        return new Promise((function(o, a) {
                            var r = e.apply(t, n);

                            function i(e) {
                                A(r, o, a, i, c, "next", e)
                            }

                            function c(e) {
                                A(r, o, a, i, c, "throw", e)
                            }
                            i(void 0)
                        }))
                    }
                }

                function B(e, t) {
                    var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (!n) {
                        if (Array.isArray(e) || (n = O(e)) || t && e && "number" == typeof e.length) {
                            n && (e = n);
                            var o = 0,
                                a = function() {};
                            return {
                                s: a,
                                n: function() {
                                    return o >= e.length ? {
                                        done: !0
                                    } : {
                                        done: !1,
                                        value: e[o++]
                                    }
                                },
                                e: function(e) {
                                    throw e
                                },
                                f: a
                            }
                        }
                        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }
                    var r, i = !0,
                        c = !1;
                    return {
                        s: function() {
                            n = n.call(e)
                        },
                        n: function() {
                            var e = n.next();
                            return i = e.done, e
                        },
                        e: function(e) {
                            c = !0, r = e
                        },
                        f: function() {
                            try {
                                i || null == n.return || n.return()
                            } finally {
                                if (c) throw r
                            }
                        }
                    }
                }

                function N(e, t) {
                    return function(e) {
                        if (Array.isArray(e)) return e
                    }(e) || function(e, t) {
                        var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != n) {
                            var o, a, r, i, c = [],
                                l = !0,
                                s = !1;
                            try {
                                if (r = (n = n.call(e)).next, 0 === t) {
                                    if (Object(n) !== n) return;
                                    l = !1
                                } else
                                    for (; !(l = (o = r.call(n)).done) && (c.push(o.value), c.length !== t); l = !0);
                            } catch (e) {
                                s = !0, a = e
                            } finally {
                                try {
                                    if (!l && null != n.return && (i = n.return(), Object(i) !== i)) return
                                } finally {
                                    if (s) throw a
                                }
                            }
                            return c
                        }
                    }(e, t) || O(e, t) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()
                }

                function O(e, t) {
                    if (e) {
                        if ("string" == typeof e) return R(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? R(e, t) : void 0
                    }
                }

                function R(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
                    return o
                }
                var H, D, F = n(3568),
                    j = n(3165);

                function z() {
                    for (var e = {}, t = 0, n = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]; t < n.length; t++) {
                        var o = n[t];
                        e[o] = Z.searchParams.get(o) || ""
                    }
                    var a = "";
                    for (var r in e) e[r] && (a += "&".concat(r, "=").concat(encodeURIComponent(e[r])));
                    return a || ""
                }

                function V() {
                    var e, t = null === (e = player_configs) || void 0 === e || null === (e = e.customName) || void 0 === e ? void 0 : e.trim();
                    return t && "null" !== t.toLowerCase() && "undefined" !== t.toLowerCase() ? "&custom_name=" + encodeURIComponent(t) : ""
                }

                function U() {
                    var e, t = !1;
                    return e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0), t
                }

                function W(e) {
                    for (var t = [], n = 0, o = e.length; n < o; n++) {
                        var a = Number(e.charCodeAt(n)).toString(16);
                        t.push(a)
                    }
                    return t.join("")
                }
                window.pandaLoad = window.pandaLoad || {}, g.v.init({
                    applicationId: "a1a7d0d6-1747-4f71-8b83-f40ab969df96",
                    clientToken: "pubdac4e2a41f7131334907739c4e6ffe48",
                    site: "datadoghq.com",
                    service: "panda-player",
                    env: window.location.hostname.includes(".stg.") ? "staging" : window.location.hostname.includes("localhost") ? "development" : "production",
                    version: (null === (l = document.currentScript) || void 0 === l || null === (l = l.src) || void 0 === l ? void 0 : l.split("/").pop()) || "unknown",
                    sessionSampleRate: 10,
                    sessionReplaySampleRate: 0,
                    defaultPrivacyLevel: "mask-user-input",
                    compressIntakeRequests: !0
                }), void 0 !== document.hidden ? (H = "hidden", D = "visibilitychange") : void 0 !== document.msHidden ? (H = "msHidden", D = "msvisibilitychange") : void 0 !== document.webkitHidden && (H = "webkitHidden", D = "webkitvisibilitychange");
                var Z = new URL(location.href),
                    G = "https://api-v2.pandavideo.com.br",
                    Q = "https://subtitles.tv.pandavideo.com.br",
                    K = "https://config.tv.pandavideo.com.br",
                    J = "https://thumbs.tv.pandavideo.com.br",
                    Y = "https://config-live.tv.pandavideo.com.br",
                    X = "https://config-drm.tv.pandavideo.com.br",
                    $ = ".tv.pandavideo.com.br",
                    ee = {
                        status: "offline",
                        id: null
                    },
                    te = null,
                    ne = [".cdn1.pandavideo.com", ".b-cdn.net"],
                    oe = ["fragLoadError", "fragLoadTimeOut", "fragParsingError"],
                    ae = !1,
                    re = !1,
                    ie = 0,
                    ce = !1,
                    le = Z.searchParams.get("v"),
                    se = !1,
                    de = !1,
                    ue = [],
                    pe = Z.searchParams.get("l"),
                    me = (Z.searchParams.get("liveBeta"), Z.searchParams.get("c")),
                    fe = Z.searchParams.get("j"),
                    ye = !1,
                    he = "true" === Z.searchParams.get("isLive");
                le && -1 !== le.indexOf(W("live")) && (he = !0), le && -1 !== le.indexOf(W("comp")) && (ye = le, le = null);
                var ve = !1,
                    ge = !1,
                    be = !0,
                    we = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
                    _e = "true" === Z.searchParams.get("autoplay"),
                    Ce = "true" === Z.searchParams.get("isDashboard"),
                    ke = Z.searchParams.get("title"),
                    xe = Z.searchParams.get("refreshConfig"),
                    Ee = !document[H],
                    Te = "false" !== Z.searchParams.get("preload"),
                    Se = !0;
                "false" === Z.searchParams.get("preloadUserAgentChecker") && (Se = !1), Se && ["Kwai_Pro"].some((function(e) {
                    return -1 !== navigator.userAgent.indexOf(e)
                })) && (Te = !1), Ee || (Te = !1);
                var Le, Ie = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),
                    Me = /(iPhone|iPod|iPad)/i.test(navigator.platform),
                    Pe = we && !Me,
                    Ae = navigator.brave || !1,
                    qe = !1,
                    Be = y.ZP && y.ZP.isSupported() && !Me,
                    Ne = null,
                    Oe = Z.searchParams.get("watermark"),
                    Re = Z.searchParams.get("drm_group_id"),
                    He = !1,
                    De = 0,
                    Fe = [],
                    je = [],
                    ze = [],
                    Ve = null,
                    Ue = !1,
                    We = "default",
                    Ze = null,
                    Ge = null,
                    Qe = !1,
                    Ke = !1,
                    Je = "NOT_LIVE",
                    Ye = !1,
                    Xe = (Z.searchParams.get("liveBadge"), []),
                    $e = !1,
                    et = {},
                    tt = document.querySelector(":root"),
                    nt = !1,
                    ot = !1,
                    at = !1,
                    rt = !1,
                    it = !1,
                    ct = !1,
                    lt = "https://hit-video.pandavideo.com:6443",
                    st = U(),
                    dt = [],
                    ut = function() {
                        var e = location.host,
                            t = "pt";
                        try {
                            e.match(/.com$/) && (t = "en")
                        } catch (e) {}
                        return t
                    }(),
                    pt = n(2740),
                    mt = {},
                    ft = B(pt.keys());
                try {
                    for (ft.s(); !(Le = ft.n()).done;) {
                        var yt = Le.value,
                            ht = yt.match(/([A-Za-z0-9-_]+)\./i);
                        if (ht && ht.length > 1) {
                            var vt = N(ht, 2)[1];
                            mt[vt] = pt(yt)
                        }
                    }
                } catch (e) {
                    ft.e(e)
                } finally {
                    ft.f()
                }
                var gt, bt, wt = !1,
                    _t = [],
                    Ct = null,
                    kt = 0,
                    xt = 15,
                    Et = [],
                    Tt = !1,
                    St = !1,
                    Lt = ["play", "rewind", "fast-forward", "mute", "volume", "current-time", "duration", "captions", "ai-assistant-chat", "panda-ai", "live-chat", "settings", "fullscreen", "download-offline", "bookmarks", "smart-search", "airplay", "pip", "cast", "play-large", "progress", "title"],
                    It = Lt.slice(0, 7),
                    Mt = Lt.slice(7),
                    Pt = 0,
                    At = [],
                    qt = {
                        fullscreen: {
                            enabled: !0,
                            fallback: !0,
                            iosNative: !0
                        },
                        hideControls: !0,
                        captions: {
                            active: !1,
                            language: "",
                            update: !0
                        },
                        controls: ["play-large", "play", "progress", "current-time", "duration", "mute", "volume", "settings", "pip", "airplay", "fullscreen"],
                        keyboard: {
                            focused: !0,
                            global: !1
                        },
                        i18n: mt[ut],
                        iconUrl: "./icons/plyr.svg",
                        thumbnail: {
                            enabled: !1,
                            pic_num: 0,
                            width: 300,
                            height: 168,
                            col: 6,
                            row: 6,
                            offsetX: 0,
                            offsetY: 0,
                            urls: []
                        },
                        timeDisplayType: "CURRENT_TOTAL_TIME"
                    },
                    Bt = ["click", "mousemove", "mouseover", "mousemove", "touchmove", "focus"],
                    Nt = (bt = N((gt = Z.host).match(/(vz-[a-z0-9]{8}-[a-z0-9]{3})/) || [], 1)[0]) ? (gt.match(/vunel/) && (de = !0), bt) : null,
                    Ot = function() {
                        var e = "";
                        try {
                            document.location.ancestorOrigins && document.location.ancestorOrigins.length > 0 ? e = document.location.ancestorOrigins[document.location.ancestorOrigins.length - 1] : document.referrer && (e = document.referrer)
                        } catch (t) {
                            e = window.self === window.top || document.referrer ? document.referrer : "https://private.pandavideo.com.br/"
                        }
                        return e
                    }();
                Nt && (pe = Nt);
                var Rt, Ht = "";
                try {
                    Rt = localStorage.getItem("playerUser")
                } catch (e) {}
                if (Rt) Ht = Rt;
                else {
                    Ht = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                        var t = 16 * Math.random() | 0;
                        return ("x" == e ? t : 3 & t | 8).toString(16)
                    }));
                    try {
                        localStorage.setItem("playerUser", Ht)
                    } catch (e) {}
                }

                function Dt() {
                    var e = "true" === Z.searchParams.get("hideCloseChat") ? "&hideCloseChat=true" : "";
                    return '<div style="position:relative;width:100%;height:100%"><iframe src="./live_chat.html?c='.concat(me, "&l=").concat(pe).concat(e, '" style="border:none;position:absolute;top:0;left:0;" width="100%" height="100%" fetchpriority="high"></iframe></<div>')
                }

                function Ft() {
                    if (!le && me && pe) {
                        var e = Dt(),
                            t = document.getElementsByClassName("plyr")[0];
                        t && t.insertAdjacentHTML("beforeend", e)
                    } else {
                        var n = "https://b-" + pe + $ + "/" + le + "/playlist.m3u8";
                        Me && window.player_configs && window.player_configs.initQuality && 0 !== window.player_configs.initQuality && (n = "https://b-".concat(pe).concat($, "/").concat(le, "/").concat(window.player_configs.initQuality, "p/video.m3u8")), Oe && (re = !0, n += ".beta?watermark=" + Oe), he && (n = "https://b-" + pe + $ + "/" + le + "/live/playlist.m3u8" + (Ot ? "&custom_referrer=" + Ot : "")), "true" === xe && (n += "".concat(-1 === n.indexOf("?") ? "?" : "&", "nocache=").concat((new Date).getTime()));
                        var o = 'src="' + n + '"';
                        (fe || ye) && (o = "");
                        var a = '\n        <div class="container " id="video-container">\n            '.concat(we ? "" : '<video controls crossorigin preload="auto" '.concat(_e ? "autoplay muted" : "", ' playsinline ><source type="application/x-mpegURL" ').concat(o, "></video>"), '\n            \x3c!-- Loading indicator --\x3e\n            <div id="error-indicator" class="disabled">\n            </div>\n            <div class="loading-icon disabled">\n                <svg x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">\n                    <path fill="#9e9e9e"\n                        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">\n                        <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s"\n                            from="0 50 50" to="360 50 50" repeatCount="indefinite" />\n                    </path>\n                </svg>\n            </div>\n            \n            \x3c!-- Live --\x3e\n            <div class="live-offline-badge disabled">\n\n                <div id="live-title-text">Waiting for the Live to start...</div>\n                <div class="live-subtitle-text">Aguardando inicio da Live...</div>\n                <div class="live-subtitle-text">Esperando el inicio del Live...</div>\n            </div>\n            <div class="live-thumb disabled">\n                <img src="#" alt="Live Offline">\n            </div>\n        </div>\n    ');
                        if (window.observer || (window.observer = new MutationObserver((function(e) {
                                var t, n = B(e);
                                try {
                                    for (n.s(); !(t = n.n()).done;) {
                                        var o = t.value;
                                        "childList" === o.type && o.addedNodes.forEach((function(e) {
                                            var t;
                                            "video-container" === e.id && (t = document.getElementById("video-container"), new ResizeObserver((function(e) {
                                                var n, o = B(e);
                                                try {
                                                    for (o.s(); !(n = o.n()).done;) {
                                                        n.value.target.getBoundingClientRect().bottom > window.innerHeight && (t.style.cssText = "margin-top: 0px !important;")
                                                    }
                                                } catch (e) {
                                                    o.e(e)
                                                } finally {
                                                    o.f()
                                                }
                                            })).observe(t), xo(), fe || ye || (window.pandatag ? window.pandatag("videoHtmlLoaded", !0) : window.pandaLoad.videoHtmlLoaded = !0), window.observer.disconnect())
                                        }))
                                    }
                                } catch (e) {
                                    n.e(e)
                                } finally {
                                    n.f()
                                }
                            }))), window.observer.observe(document.body, {
                                childList: !0,
                                subtree: !0
                            }), document.addEventListener("DOMContentLoaded", (function e() {
                                xo(), fe || ye || (window.pandatag ? window.pandatag("videoHtmlLoaded", !0) : window.pandaLoad.videoHtmlLoaded = !0), document.removeEventListener("DOMContentLoaded", e)
                            })), Te) {
                            if (Ne && document.body.insertAdjacentHTML("beforeend", a), Ne || document.write(a), we) {
                                var r = (new DOMParser).parseFromString('<video controls crossorigin preload="auto" '.concat(_e ? "autoplay muted" : "", ' playsinline ><source type="application/x-mpegURL" ').concat(o, "></video>"), "text/html").body.firstChild,
                                    i = document.getElementById("video-container");
                                i.insertBefore(r, i.getElementsByTagName("div")[0])
                            }
                            jt()
                        }
                    }
                }

                function jt() {
                    ! function() {
                        try {
                            var e = document.getElementById("context-menu");
                            e && e.remove()
                        } catch (e) {}
                    }();
                    try {
                        if (!U()) {
                            var e = document.createElement("div");
                            e.id = "context-menu", To(e, "disabled"), e.innerHTML = '<ul> <li> <a href="'.concat(mt[ut].aboutPandaLink, '" target="_blank" id="about-panda">').concat(mt[ut].aboutPanda, '</a> </li><li> <button id="report-problem">').concat(mt[ut].reportModalTitle, "</button> </li>").concat(st ? "" : '<li> <button id="view-hotkeys">'.concat(mt[ut].viewHotKeys, "</button> </li>"), "</ul>"), document.body.appendChild(e), new MutationObserver((function(t, n) {
                                var o = document.querySelector(".plyr__video-wrapper");
                                o && (o.insertAdjacentElement("afterbegin", e), n.disconnect())
                            })).observe(document.body, {
                                childList: !0,
                                subtree: !0
                            }), document.getElementById("report-problem").onclick = function() {
                                window.postMessage({
                                    type: "pause"
                                }, "*"), Vt(), Xt()
                            }, document.getElementById("view-hotkeys").onclick = function() {
                                Ut(), Xt()
                            }
                        }
                    } catch (e) {}
                }
                Ft();
                var zt = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4713 4.97141C12.7317 4.71107 12.7317 4.28896 12.4713 4.02861C12.211 3.76826 11.7889 3.76826 11.5285 4.02861L7.99992 7.5572L4.47132 4.02861C4.21097 3.76826 3.78886 3.76826 3.52851 4.02861C3.26816 4.28896 3.26816 4.71107 3.52851 4.97141L7.05711 8.50001L3.52851 12.0286C3.26816 12.289 3.26816 12.7111 3.52851 12.9714C3.78886 13.2318 4.21097 13.2318 4.47132 12.9714L7.99992 9.44282L11.5285 12.9714C11.7889 13.2318 12.211 13.2318 12.4713 12.9714C12.7317 12.7111 12.7317 12.289 12.4713 12.0286L8.94273 8.50001L12.4713 4.97141Z" fill="white"/>\n</svg>';

                function Vt() {
                    try {
                        So(document.getElementById("report-problem-dialog"), "disabled"), document.getElementById("report-close-dialog-btn").onclick = Gt, document.getElementById("radio-section").addEventListener("click", (function(e) {
                            e.target && e.target.matches("input[type='radio']") && ("report-other" === document.querySelector('input[name="issue-reported"]:checked').value ? (So(document.getElementById("other-input-wrapper"), "disabled"), document.getElementById("other-input").focus()) : To(document.getElementById("other-input-wrapper"), "disabled"))
                        })), document.getElementById("report-second-step-btn").onclick = q(P().mark((function e() {
                            var t, n, o;
                            return P().wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.prev = 0, To(document.getElementById("report-first-step"), "disabled"), So(document.getElementById("report-second-step"), "disabled"), t = document.querySelector('input[name="issue-reported"]:checked').value, n = Kt(t), e.next = 8, Wt();
                                    case 8:
                                        o = e.sent, n.latencies = o, Qt(), e.next = 15;
                                        break;
                                    case 13:
                                        e.prev = 13, e.t0 = e.catch(0);
                                    case 15:
                                    case "end":
                                        return e.stop()
                                }
                            }), e, null, [
                                [0, 13]
                            ])
                        })))
                    } catch (e) {
                        Qt()
                    }
                }

                function Ut() {
                    try {
                        So(document.getElementById("hot-keys-dialog"), "disabled"), document.getElementById("hot-keys-dialog-content").querySelector("button").onclick = function() {
                            To(document.getElementById("hot-keys-dialog"), "disabled")
                        }
                    } catch (e) {}
                }

                function Wt() {
                    return Zt.apply(this, arguments)
                }

                function Zt() {
                    return Zt = q(P().mark((function e() {
                        var t, n, o, a, r;
                        return P().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    t = [], n = ["BR", "RJ"], o = P().mark((function e() {
                                        var n, o, i;
                                        return P().wrap((function(e) {
                                            for (;;) switch (e.prev = e.next) {
                                                case 0:
                                                    return n = r[a], o = (new Date).valueOf(), i = "https://edgezone-" + n.toLowerCase() + ".bunnyinfra.net/500b.jpg", e.next = 5, fetch(i).then(function() {
                                                        var e = q(P().mark((function e(a) {
                                                            return P().wrap((function(e) {
                                                                for (;;) switch (e.prev = e.next) {
                                                                    case 0:
                                                                        return o = (new Date).valueOf(), e.next = 3, fetch(i).then(function() {
                                                                            var e = q(P().mark((function e(a) {
                                                                                var r, i;
                                                                                return P().wrap((function(e) {
                                                                                    for (;;) switch (e.prev = e.next) {
                                                                                        case 0:
                                                                                            return r = (new Date).valueOf(), i = r - o, e.next = 4, fetch("https://video-91.bunnycdn.com/.metrics/track-performance?zone=" + n + "&latency=" + i);
                                                                                        case 4:
                                                                                            t.push({
                                                                                                zone: n.toLowerCase(),
                                                                                                latency: i
                                                                                            });
                                                                                        case 5:
                                                                                        case "end":
                                                                                            return e.stop()
                                                                                    }
                                                                                }), e)
                                                                            })));
                                                                            return function(t) {
                                                                                return e.apply(this, arguments)
                                                                            }
                                                                        }()).catch((function(e) {}));
                                                                    case 3:
                                                                    case "end":
                                                                        return e.stop()
                                                                }
                                                            }), e)
                                                        })));
                                                        return function(t) {
                                                            return e.apply(this, arguments)
                                                        }
                                                    }()).catch((function(e) {}));
                                                case 5:
                                                case "end":
                                                    return e.stop()
                                            }
                                        }), e)
                                    })), a = 0, r = n;
                                case 4:
                                    if (!(a < r.length)) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.delegateYield(o(), "t0", 6);
                                case 6:
                                    a++, e.next = 4;
                                    break;
                                case 9:
                                    return e.abrupt("return", t);
                                case 10:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    }))), Zt.apply(this, arguments)
                }

                function Gt() {
                    try {
                        To(document.getElementById("report-problem-dialog"), "disabled"), So(document.getElementById("report-first-step"), "disabled"), To(document.getElementById("report-second-step"), "disabled"), To(document.getElementById("report-third-step"), "disabled"), To(document.getElementById("other-input-wrapper"), "disabled"), document.getElementById("other-input-wrapper").value = "", document.getElementById("report-not-loading").checked = !0
                    } catch (e) {
                        console.log("e", e)
                    }
                }

                function Qt() {
                    try {
                        document.getElementById("report-ok-btn").onclick = Gt, To(document.getElementById("report-second-step"), "disabled"), So(document.getElementById("report-third-step"), "disabled")
                    } catch (e) {}
                }

                function Kt(e) {
                    var t = {
                        timestamp: (new Date).toISOString()
                    };
                    if (t.option = e, "report-other" === e) try {
                        var n = document.getElementById("other-input").value;
                        t.reasoning = n
                    } catch (e) {}
                    try {
                        t.autoplay = window.player.autoplay
                    } catch (e) {}
                    try {
                        t.videoId = le
                    } catch (e) {}
                    try {
                        t.libraryId = pe
                    } catch (e) {}
                    try {
                        t.currentTime = window.player.currentTime
                    } catch (e) {}
                    try {
                        t.duration = window.player.duration
                    } catch (e) {}
                    try {
                        t.volume = window.player.volume
                    } catch (e) {}
                    try {
                        t.config = JSON.stringify(window.player_configs)
                    } catch (e) {}
                    try {
                        t.playerUser = localStorage.getItem("playerUser")
                    } catch (e) {}
                    return t
                }

                function Jt(e) {
                    e && window.player_configs.troubleshootDialog && (e.addEventListener("contextmenu", Yt, !1), e.addEventListener("click", Xt, !1))
                }

                function Yt(e) {
                    if (!e.target.closest("#report-problem-dialog") && !e.target.closest("#content-ai-dialog")) {
                        e.preventDefault();
                        var t = document.getElementById("context-menu");
                        t && (So(t, "disabled"), window.innerWidth - e.clientX < 175 ? t.style.left = e.clientX - 175 + "px" : t.style.left = e.clientX + "px", window.innerHeight - e.clientY < 75 ? t.style.top = e.clientY - 75 + "px" : t.style.top = e.clientY + "px")
                    }
                }

                function Xt() {
                    To(document.getElementById("context-menu"), "disabled")
                }

                function $t() {
                    if (! function() {
                            try {
                                return window.self !== window.top
                            } catch (e) {
                                return !0
                            }
                        }()) {
                        var e = document.getElementById("video-container");
                        e && (To(e, "in-page-container"), document.getElementById("body").style.backgroundColor = "#000", xo())
                    }
                }

                function en(e, t, n) {
                    if ("branding" === t || "title" === t) return window.player.elements.controls.appendChild(e);
                    var o = {
                        control_name: t,
                        element: e
                    };
                    return At.push(o)
                }

                function tn() {
                    var e = document.querySelector(".small-muted-icon");
                    e && To(e, "disabled")
                }

                function nn(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        n = parseInt(e, 10);
                    return isNaN(n) ? t : n
                }

                function on() {
                    de && console.log("onClickPlayMutedIndicator"), rt = !0;
                    var e = document.querySelector(".panda-muted-indicator-item");
                    if (e) {
                        var t = document.querySelector(".plyr--video");
                        if (t && t.classList.remove("plyr--force-hide-controls"), player_configs.mutedIndicatorClickRestart) {
                            var n = nn(Z.searchParams.get("startTime"), 0);
                            if (player_configs.saveProgress) try {
                                n = nn(localStorage.getItem("panda_video:" + le), nn(Z.searchParams.get("startTime"), 0))
                            } catch (e) {}
                            de && console.log("onClickPlayMutedIndicator"), window.postMessage({
                                type: "currentTime",
                                parameter: n
                            }, "*")
                        }
                        window.postMessage({
                            type: "increaseVolume",
                            parameter: 1
                        }, "*"), window.postMessage({
                            type: "play"
                        }, "*"), e.style.display = "none";
                        try {
                            _o({
                                mutedIndicator: !0
                            })
                        } catch (e) {}
                        var o = document.getElementById("wrapper-progress");
                        o && So(o, "disabled"), player_configs.playOpensFullscreenNative ? window.player.fullscreen.enter() : player_configs.playOpensFullscreen && window.parent.postMessage({
                            message: "panda_open_window_fullscreen",
                            video: le
                        }, "*")
                    }
                }

                function an() {
                    var e;
                    if (Te) {
                        if (0 === document.getElementsByClassName("plyr--full-ui").length) return;
                        if (document.getElementsByClassName("small-muted-icon").length) return;
                        e = document.getElementsByClassName("plyr--full-ui")[0]
                    } else e = document.getElementById("video-container");
                    var t = document.createElement("button"),
                        n = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="7.999 9.062 46.75 32.563" enable-background="new 7.999 9.062 46.75 32.563" xml:space="preserve"> <style>@keyframes BLINK{0%{opacity: 0;}33%{opacity: 1;}66%{opacity: 1;}100%{opacity: 0;}}.blink_1{animation: BLINK 2s infinite; opacity: 0;}.blink_2{animation: BLINK 2s infinite .3s; opacity: 0;}.blink_3{animation: BLINK 2s infinite .6s; opacity: 0;}</style><style class="darkreader darkreader--sync" media="screen"></style> <g class="adjustable fg" style="fill: rgb(255, 255, 255); --darkreader-inline-fill:#ffffff;" data-darkreader-inline-fill=""> <path d="M53.249,39.616c-0.186,0-0.371-0.051-0.537-0.157l-43.5-27.75c-0.466-0.297-0.603-0.916-0.306-1.381c0.298-0.466,0.917-0.601,1.381-0.306l43.5,27.75c0.467,0.297,0.604,0.916,0.307,1.381C53.901,39.453,53.579,39.616,53.249,39.616z"></path> <path class="blink_3" d="M48.896,33.467l1.699,1.085c3.497-7.791,2.073-17.271-4.313-23.659c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414C50.581,18.019,51.913,26.463,48.896,33.467z"></path> <path class="blink_3" d="M46.926,36.956c-0.612,0.863-1.286,1.695-2.059,2.469c-0.392,0.391-0.392,1.023,0,1.414c0.194,0.195,0.45,0.293,0.707,0.293c0.256,0,0.512-0.098,0.706-0.293c0.878-0.878,1.642-1.824,2.333-2.807L46.926,36.956z"></path> <path class="blink_2" d="M42.543,29.415l1.777,1.135c1.545-5.315,0.229-11.293-3.953-15.476c-0.392-0.391-1.023-0.391-1.414,0c-0.392,0.391-0.392,1.023,0,1.414C42.454,19.987,43.639,24.925,42.543,29.415z"></path> <path class="blink_2" d="M41,33.174c-0.563,0.94-1.235,1.837-2.047,2.646c-0.391,0.392-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.916-0.914,1.676-1.924,2.317-2.984L41,33.174z"></path> <path class="blink_1" d="M35.771,25.094l2.003,1.277c0.012-0.203,0.029-0.404,0.029-0.609c0-3.079-1.2-5.974-3.381-8.153c-0.391-0.391-1.022-0.391-1.414,0c-0.391,0.391-0.391,1.023,0,1.414C34.652,20.666,35.613,22.802,35.771,25.094z"></path> <path class="blink_1" d="M35.084,29.401c-0.474,1.145-1.172,2.197-2.076,3.1c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293c0.257,0,0.513-0.098,0.707-0.293c1.008-1.006,1.795-2.17,2.361-3.43L35.084,29.401z"></path> <polygon points="28.124,20.215 28.124,14.991 24.635,17.99 "></polygon> <path d="M20.921,20.366h-6.423c-0.553,0-1,0.508-1,1.135v8.229c0,0.627,0.447,1.135,1,1.135h7.375l6.25,5.875V24.96L20.921,20.366z"></path> </g> </svg>';
                    n = n + "<span>" + mt[ut].activateSound + "</span>", t.innerHTML = n, t.onclick = function() {
                        if (he) window.postMessage({
                            type: "increaseVolume",
                            parameter: 1
                        }, "*"), tn(), rt = !0, _o({
                            mutedIndicator: !0
                        });
                        else {
                            if (player_configs.mutedIndicatorClickRestart) {
                                var e = nn(Z.searchParams.get("startTime"), 0);
                                if (player_configs.saveProgress) try {
                                    e = nn(localStorage.getItem("panda_video:" + le), nn(Z.searchParams.get("startTime"), 0))
                                } catch (e) {}
                                de && console.log("addSmallMutedIcon muted_indicator.onclick"), window.postMessage({
                                    type: "currentTime",
                                    parameter: e
                                }, "*")
                            }
                            window.postMessage({
                                type: "increaseVolume",
                                parameter: 1
                            }, "*"), window.postMessage({
                                type: "play",
                                parameter: 1
                            }, "*"), tn(), rt = !0, _o({
                                mutedIndicator: !0
                            })
                        }
                    };
                    var o = document.querySelector(".plyr__controls");
                    o && (o.onclick = function() {
                        if (!rt)
                            if (he) window.postMessage({
                                type: "increaseVolume",
                                parameter: 1
                            }, "*"), tn(), rt = !0, _o({
                                mutedIndicator: !0
                            });
                            else {
                                if (player_configs.mutedIndicatorClickRestart) {
                                    var e = 0;
                                    if (player_configs.saveProgress) try {
                                        e = parseInt(localStorage.getItem("panda_video:" + le))
                                    } catch (e) {}
                                    isNaN(e) && (e = 0), de && console.log("addSmallMutedIcon controls.onclick"), window.postMessage({
                                        type: "currentTime",
                                        parameter: e
                                    }, "*")
                                }
                                window.postMessage({
                                    type: "increaseVolume",
                                    parameter: 1
                                }, "*"), window.postMessage({
                                    type: "play",
                                    parameter: 1
                                }, "*"), _o({
                                    mutedIndicator: !0
                                }), rt = !0
                            }
                        tn()
                    }), To(t, "small-muted-icon"), Me ? e.after(t) : e.appendChild(t), rt = !1
                }

                function rn(e) {
                    var t = (e = e.replace("#", "").replace("%23", "").substring(0, 6)).match(/.{1,2}/g);
                    return [parseInt(t[0], 16), parseInt(t[1], 16), parseInt(t[2], 16)]
                }

                function cn() {
                    var e, t = window.player_configs.mutedIndicatorTextTop,
                        n = window.player_configs.mutedIndicatorTextBottom;
                    if (Te) {
                        if (0 === document.getElementsByClassName("plyr--full-ui").length) return;
                        e = document.getElementsByClassName("plyr--full-ui")[0]
                    } else e = document.getElementById("video-container");
                    var o = document.createElement("button"),
                        a = '<svg class="impact" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" xml:space="preserve"><style>.fg-color{fill:var(--muted-indicator-text)}.bg-color{fill:var(--muted-indicator-background)}.line,.volume,.wave{transform:scale(1);transform-box:fill-box;transform-origin:center;}</style><filter id="panda-muted-indicator-impact-wrapper-highlight"><feDropShadow dx="0" dy="0" stdDeviation="1" flood-color="var(--muted-indicator-text)"/></filter><g class="adjustable fg" style="--darkreader-inline-fill:#ffffff"><path class="volume fg-color" d="M169.8 85.5h-23c-1.9 0-3.1 1.2-3.1 3.1v26.5c0 1.9 1.2 3.1 3.1 3.1h23l19.3 18.4V68.7c.3 0-19.3 16.8-19.3 16.8z"/><path class="wave fg-color" d="M205.9 127.8c-1.2-1.2-.9-3.4.3-5 9.6-12.1 9.6-29.3 0-41.1-1.2-1.6-1.2-3.7-.3-5 1.2-1.2 3.7-.9 5 .9 11.5 14.3 11.5 34.9 0 48.9-1.4 2.6-3.8 2.6-5 1.3z"/><path class="wave fg-color" d="M223.9 138.4c-1.2-1.2-.9-3.4.3-5 14.6-17.1 14.6-42.3 0-59.4-1.2-1.6-1.6-3.7-.3-5 1.2-1.2 3.4-.9 5 .9 16.5 19.3 16.5 48.2 0 67.5-1.5 2.2-3.8 2.6-5 1z"/><path class="wave fg-color" d="M241.6 149.3c-1.2-1.2-.9-3.4.3-5 21.2-24 21.2-60.1 0-84-1.2-1.2-1.6-3.1-.3-4.4 1.2-1.2 3.4-.9 5 .6 23.3 26.1 23.3 66 0 92.1-1.2 1.9-3.7 2.2-5 .7z"/><path class="line bg-color" d="M274 141.2c-.3-1.6-1.2-3.1-2.8-4L135.6 50.6c-.9-.6-2.2-.9-3.4-.9-2.2 0-4 .9-5.3 2.8-.9 1.6-1.2 3.1-.9 4.7.3 1.6 1.2 3.1 2.8 4l135.4 86.2c.9.6 2.2.9 3.4.9 2.2 0 4-.9 5.3-2.8 1.1-.9 1.4-2.7 1.1-4.3z"/><path class="line fg-color" d="M267.8 145.9c-.6 0-1.2-.3-1.6-.6L130.9 58.4c-1.6-.9-1.9-2.8-.9-4 .9-1.6 2.8-1.9 4-.9l135.4 86.2c1.6.9 1.9 2.8.9 4.4-.7.8-1.5 1.8-2.5 1.8z"/></g></svg>';
                    a += '<svg class="blink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" xml:space="preserve"><style>.fg-color{fill:var(--muted-indicator-text)}.bg-color{fill:var(--muted-indicator-background)}.line,.volume,.wave{transform:scale(1);transform-box:fill-box;transform-origin:center;}</style><g class="adjustable fg" style="--darkreader-inline-fill:#ffffff"><path class="volume fg-color" d="M189.1 68.7c.2 0-5.4 4.8-10.6 9.3l10.6 6.8V68.7z"/><path class="volume fg-color" d="M146.8 85.5c-1.9 0-3.1 1.2-3.1 3.1v26.5c0 1.9 1.2 3.1 3.1 3.1h23l19.3 18.4v-37L167 85.5h-20.2z"/><path class="wave blink_impact_1 fg-color" d="M206.2 122.8c-1.2 1.6-1.5 3.8-.3 5 1.2 1.3 3.6 1.3 5-1.3 2.4-2.9 4.3-6.1 5.7-9.4l-5.3-3.4c-1.2 3.2-2.9 6.3-5.1 9.1z"/><path class="wave blink_impact_1 fg-color" d="M210.9 77.6c-1.3-1.8-3.8-2.1-5-.9-.9 1.3-.9 3.4.3 5 4.4 5.4 6.7 11.9 7.1 18.5l6.1 3.9c.5-9.3-2.3-18.8-8.5-26.5z"/><path class="wave blink_impact_2 fg-color" d="M224.2 133.4c-1.2 1.6-1.5 3.8-.3 5 1.2 1.6 3.5 1.2 5-1 2.3-2.7 4.3-5.6 6-8.7l-5.2-3.3c-1.5 2.8-3.4 5.5-5.5 8z"/><path class="wave blink_impact_2 fg-color" d="M228.9 69.9c-1.6-1.8-3.8-2.1-5-.9-1.3 1.3-.9 3.4.3 5 9.6 11.2 12.9 25.9 9.9 39.5l5.5 3.5c4.2-16.1.6-33.9-10.7-47.1z"/><path class="wave blink_impact_3 fg-color" d="M241.9 144.3c-1.2 1.6-1.5 3.8-.3 5 1.3 1.5 3.8 1.2 5-.7 2.4-2.6 4.5-5.4 6.4-8.4l-5.4-3.4c-1.7 2.6-3.6 5.1-5.7 7.5z"/><path class="wave blink_impact_3 fg-color" d="M246.6 56.5c-1.6-1.5-3.8-1.8-5-.6-1.3 1.3-.9 3.2.3 4.4 16.2 18.3 20 43.8 11.4 65.5l5.5 3.5c9.9-24 5.9-52.6-12.2-72.8z"/><path class="line fg-color" d="m269.4 139.7-11.9-7.6-5.4-3.5-13.4-8.5-5.4-3.4-14.1-9-5.8-3.7-24.2-15.4-13.2-8.4-42-26.7c-1.2-1-3.1-.7-4 .9-1 1.2-.7 3.1.9 4l40.3 25.9 17.9 11.5 23.2 14.9 5.4 3.4 13.4 8.6 5.2 3.4 12.9 8.3 5.4 3.5 11.7 7.5c.4.3 1 .6 1.6.6 1 0 1.8-1 2.5-1.8.9-1.7.6-3.6-1-4.5z"/></g></svg>', (t.length > 18 || n.length > 18) && To(o, "panda-muted-indicator-impact-wrapper-big-text"), a = '<span class="panda-muted-indicator-impact-wrapper-canvas"></span>' + a, t && (a = '<span class="text top">' + t + "</span>" + a), n && (a = a + '<span class="text bottom">' + n + "</span>"), o.innerHTML = a, To(o, "panda-muted-indicator-impact-wrapper"), To(o, "panda-muted-indicator-item"), To(o, "animate"), To(o, player_configs.mutedIndicatorSize);
                    var r = player_configs.controls.filter((function(e) {
                        return "play-large" !== e
                    }));
                    Te && Me && r.length && player.on("controlsshown", (function() {
                        rt || on()
                    })), o.onclick = function() {
                        on()
                    };
                    var i = document.querySelector('button[data-plyr="play"].plyr__control--overlaid');
                    i && To(i, "disabled");
                    var c = function(e) {
                            return 100 * e / (1e3 * d) + "%"
                        },
                        l = function(e, t) {
                            return "IMPACT_" + e + "{0%{opacity:0;transform:scale(4);}" + c(850 * t / 1e3) + "{opacity:1;}" + c(t) + ",100%{opacity:1;transform:scale(1);}}"
                        },
                        s = window.player_configs.mutedIndicatorLoop,
                        d = window.player_configs.mutedIndicatorLoopDuration,
                        u = document.createElement("style"),
                        p = "        @keyframes BLINK_IMPACT{0%,100%{opacity:0;}33%,66%{opacity:1;}}        @keyframes HIGHLIGHT{0%,100%{filter:url(#panda-muted-indicator-impact-wrapper-highlight);}}        @keyframes OPACITY_0{0%,100%{opacity:0;}}        @keyframes OPACITY_1{0%,100%{opacity:1;}}        @keyframes SVG_WRAPPER{0%{width:100%;max-width:100%;}100%{width:var(--size-width);max-width:400px;}}        @keyframes IMPACT{0%{opacity:0;transform:scale(3);}85%{opacity:1;}100%{transform:scale(1);}}        @keyframes IMPACT_CENTER{0%{opacity:0;transform:translate(-50%, -50%) scale(3);}85%{opacity:1;}100%{transform:translate(-50%, -50%) scale(1);}}        button.panda-muted-indicator-impact-wrapper.animate svg.impact {            animation: SVG_WRAPPER 750ms cubic-bezier(.76,.05,.86,.06), OPACITY_0 10s linear infinite 850ms;        }        button.panda-muted-indicator-impact-wrapper.animate .text.bottom {            animation: IMPACT 262ms cubic-bezier(.76,.05,.86,.06);        }        button.panda-muted-indicator-impact-wrapper.animate svg.impact .line.fg-color {            animation: HIGHLIGHT 262ms cubic-bezier(.76,.05,.86,.06), IMPACT 262ms cubic-bezier(.76,.05,.86,.06) 131ms;        }        button.panda-muted-indicator-impact-wrapper.animate svg.impact .line.bg-color {            animation: IMPACT 314ms cubic-bezier(.76,.05,.86,.06) 236ms;            opacity: 0;        }        button.panda-muted-indicator-impact-wrapper.animate svg.impact .wave {            animation: IMPACT 314ms cubic-bezier(.76,.05,.86,.06) 340ms;            opacity: 0;        }        button.panda-muted-indicator-impact-wrapper.animate svg.impact .volume {            animation: IMPACT 288ms cubic-bezier(.76,.05,.86,.06) 471ms, OPACITY_0 471ms cubic-bezier(.76,.05,.86,.06) 0s;        }        button.panda-muted-indicator-impact-wrapper.animate .panda-muted-indicator-impact-wrapper-canvas {            animation: IMPACT_CENTER 471ms cubic-bezier(.76,.05,.86,.06) 602ms, OPACITY_0 602ms cubic-bezier(.76,.05,.86,.06) 0s;        }        button.panda-muted-indicator-impact-wrapper.animate .text.top {            animation: IMPACT 250ms linear 550ms, OPACITY_0 550ms cubic-bezier(.76,.05,.86,.06) 0s;        }        button.panda-muted-indicator-impact-wrapper.animate svg.blink .line,        button.panda-muted-indicator-impact-wrapper.animate svg.blink .volume {            animation: OPACITY_0 850ms linear 0s;        }        button.panda-muted-indicator-impact-wrapper.animate svg.blink .blink_impact_1 {            animation: BLINK_IMPACT 2s infinite 950ms, OPACITY_0 850ms linear 0s;            opacity: 0;        }        button.panda-muted-indicator-impact-wrapper.animate svg.blink .blink_impact_2 {            animation: BLINK_IMPACT 2s infinite 1250ms, OPACITY_0 850ms linear 0s;            opacity: 0;        }        button.panda-muted-indicator-impact-wrapper.animate svg.blink .blink_impact_3 {            animation: BLINK_IMPACT 2s infinite 1550ms, OPACITY_0 850ms linear 0s;            opacity: 0;        }    ";
                    s && (p = "            @keyframes BLINK_IMPACT{0%,100%{opacity:0;}33%,66%{opacity:1;}}            @keyframes HIGHLIGHT{0%{filter:url(#panda-muted-indicator-impact-wrapper-highlight);}" + c(315) + ",100%{filter:initial;}}            @keyframes OPACITY_0{" + c(850) + "," + c(9150) + "{opacity:0;}}            @keyframes OPACITY_1{" + c(850) + "," + c(9150) + "{opacity:1;}}            @keyframes SVG_WRAPPER{0%{width:100%;}" + c(470) + ",100%{width:var(--size-width);}}            @keyframes " + l("P2", 262) + "            @keyframes " + l("LINE_FG", 262) + "            @keyframes " + l("LINE_BG", 314) + "            @keyframes " + l("BLINK", 314) + "            @keyframes " + l("VOLUME", 288) + "            @keyframes IMPACT_CANVAS{0%{opacity:0;transform:translate(-50%,-50%) scale(4);}" + c(850 * 471 / 1e3) + "{opacity:1;}" + c(471) + ",100%{opacity:1;transform:translate(-50%,-50%) scale(1);}}            @keyframes " + l("P1", 250) + "                        button.panda-muted-indicator-impact-wrapper.animate svg.impact {                animation: SVG_WRAPPER " + d + "s cubic-bezier(.76, .05, .86, .06) infinite, OPACITY_0 " + d + "s linear infinite 850ms;            }            button.panda-muted-indicator-impact-wrapper.animate .text.bottom {                animation: IMPACT_P2 " + d + "s cubic-bezier(.76,.05,.86,.06) infinite;            }            button.panda-muted-indicator-impact-wrapper.animate svg.impact .line.fg-color {                animation: HIGHLIGHT " + d + "s cubic-bezier(.76,.05,.86,.06) infinite 131ms, IMPACT_LINE_FG " + d + "s cubic-bezier(.76,.05,.86,.06) infinite 131ms;                opacity: 0;            }            button.panda-muted-indicator-impact-wrapper.animate svg.impact .line.bg-color {                animation: IMPACT_LINE_BG " + d + "s cubic-bezier(.76,.05,.86,.06) infinite 236ms;                opacity: 0;            }            button.panda-muted-indicator-impact-wrapper.animate svg.impact .wave {                animation: IMPACT_BLINK " + d + "s cubic-bezier(.76,.05,.86,.06) infinite 340ms;                opacity: 0;            }            button.panda-muted-indicator-impact-wrapper.animate svg.impact .volume {                animation: IMPACT_VOLUME " + d + "s cubic-bezier(.76,.05,.86,.06) infinite 471ms, OPACITY_0 " + d + "s cubic-bezier(.76,.05,.86,.06) infinite 0s;                opacity: 0;            }            button.panda-muted-indicator-impact-wrapper.animate .panda-muted-indicator-impact-wrapper-canvas {                animation: IMPACT_CANVAS " + d + "s cubic-bezier(.76,.05,.86,.06) infinite 602ms;                opacity: 0;            }            button.panda-muted-indicator-impact-wrapper.animate .text.top {                animation: IMPACT_P1 " + d + "s linear infinite 550ms;                opacity: 0;            }            button.panda-muted-indicator-impact-wrapper.animate svg.blink .line,            button.panda-muted-indicator-impact-wrapper.animate svg.blink .volume {                animation: OPACITY_1 " + d + "s linear infinite 425ms;                opacity: 0;            }            button.panda-muted-indicator-impact-wrapper.animate svg.blink .blink_impact_1 {                animation: BLINK_IMPACT 2s linear infinite 950ms;                opacity: 0;            }            button.panda-muted-indicator-impact-wrapper.animate svg.blink .blink_impact_2 {                animation: BLINK_IMPACT 2s linear infinite 1250ms;                opacity: 0;            }            button.panda-muted-indicator-impact-wrapper.animate svg.blink .blink_impact_3 {                animation: BLINK_IMPACT 2s linear infinite 1550ms;                opacity: 0;            }        "), u.innerHTML = p, document.getElementsByTagName("head")[0].appendChild(u), e.appendChild(o), rt = !1
                }

                function ln() {
                    var e, t = window.player_configs.mutedIndicatorTextTop,
                        n = window.player_configs.mutedIndicatorTextBottom;
                    if (Te) {
                        if (0 === document.getElementsByClassName("plyr--full-ui").length) return;
                        e = document.getElementsByClassName("plyr--full-ui")[0]
                    } else e = document.getElementById("video-container");
                    var o = document.createElement("button"),
                        a = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="7.999 9.062 46.75 32.563" enable-background="new 7.999 9.062 46.75 32.563" xml:space="preserve"> <style>@keyframes BLINK{0%{opacity: 0;}33%{opacity: 1;}66%{opacity: 1;}100%{opacity: 0;}}.blink_1{animation: BLINK 2s infinite; opacity: 0;}.blink_2{animation: BLINK 2s infinite .3s; opacity: 0;}.blink_3{animation: BLINK 2s infinite .6s; opacity: 0;}</style><style class="darkreader darkreader--sync" media="screen"></style> <g class="adjustable fg" style="fill: rgb(255, 255, 255); --darkreader-inline-fill:#ffffff;" data-darkreader-inline-fill=""> <path d="M53.249,39.616c-0.186,0-0.371-0.051-0.537-0.157l-43.5-27.75c-0.466-0.297-0.603-0.916-0.306-1.381c0.298-0.466,0.917-0.601,1.381-0.306l43.5,27.75c0.467,0.297,0.604,0.916,0.307,1.381C53.901,39.453,53.579,39.616,53.249,39.616z"></path> <path class="blink_3" d="M48.896,33.467l1.699,1.085c3.497-7.791,2.073-17.271-4.313-23.659c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414C50.581,18.019,51.913,26.463,48.896,33.467z"></path> <path class="blink_3" d="M46.926,36.956c-0.612,0.863-1.286,1.695-2.059,2.469c-0.392,0.391-0.392,1.023,0,1.414c0.194,0.195,0.45,0.293,0.707,0.293c0.256,0,0.512-0.098,0.706-0.293c0.878-0.878,1.642-1.824,2.333-2.807L46.926,36.956z"></path> <path class="blink_2" d="M42.543,29.415l1.777,1.135c1.545-5.315,0.229-11.293-3.953-15.476c-0.392-0.391-1.023-0.391-1.414,0c-0.392,0.391-0.392,1.023,0,1.414C42.454,19.987,43.639,24.925,42.543,29.415z"></path> <path class="blink_2" d="M41,33.174c-0.563,0.94-1.235,1.837-2.047,2.646c-0.391,0.392-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.916-0.914,1.676-1.924,2.317-2.984L41,33.174z"></path> <path class="blink_1" d="M35.771,25.094l2.003,1.277c0.012-0.203,0.029-0.404,0.029-0.609c0-3.079-1.2-5.974-3.381-8.153c-0.391-0.391-1.022-0.391-1.414,0c-0.391,0.391-0.391,1.023,0,1.414C34.652,20.666,35.613,22.802,35.771,25.094z"></path> <path class="blink_1" d="M35.084,29.401c-0.474,1.145-1.172,2.197-2.076,3.1c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293c0.257,0,0.513-0.098,0.707-0.293c1.008-1.006,1.795-2.17,2.361-3.43L35.084,29.401z"></path> <polygon points="28.124,20.215 28.124,14.991 24.635,17.99 "></polygon> <path d="M20.921,20.366h-6.423c-0.553,0-1,0.508-1,1.135v8.229c0,0.627,0.447,1.135,1,1.135h7.375l6.25,5.875V24.96L20.921,20.366z"></path> </g> </svg>';
                    (t.length > 18 || n.length > 18) && To(o, "panda-muted-indicator-big-text"), a = t ? "<span>" + t + "</span>" + a : "<span> </span>" + a, n ? a = a + "<span>" + n + "</span>" : a += "<span> </span>", o.innerHTML = a, To(o, "panda-muted-indicator"), To(o, "panda-muted-indicator-item"), To(o, player_configs.mutedIndicatorSize);
                    var r = player_configs.controls.filter((function(e) {
                        return "play-large" !== e
                    }));
                    Te && Me && r.length && player.on("controlsshown", (function() {
                        rt || on()
                    })), o.onclick = function() {
                        on()
                    };
                    var i = document.querySelector('button[data-plyr="play"].plyr__control--overlaid');
                    i && To(i, "disabled"), e.appendChild(o), rt = !1
                }

                function sn() {
                    var e, t = document.getElementById("custom_muted_indicator_iframe");
                    if (t && t.remove(), player_configs.customMutedIndicatorData.deleted && (player_configs.mutedIndicatorAnimation = "default", dn()), Te) {
                        if (0 === document.getElementsByClassName("plyr--full-ui").length) return;
                        e = document.getElementsByClassName("plyr--full-ui")[0]
                    } else e = document.getElementById("video-container");
                    var n = document.createElement("iframe");
                    n.id = "custom_muted_indicator_iframe", To(n, "panda-muted-indicator-custom"), To(n, "panda-muted-indicator-item"), n.onload = function() {
                        Jt(n.contentWindow.document.body);
                        var e = document.getElementById("custom_muted_indicator_iframe"),
                            t = /<script>(.|\n)*?<\/script>/gm;
                        if (player_configs.customMutedIndicatorData.script) {
                            var o = player_configs.customMutedIndicatorData.script.match(t),
                                a = player_configs.customMutedIndicatorData.script.replace(t, "");
                            if (o && o.length) {
                                var r = o[0].replace("<script>", "").replace("<\/script>", ""),
                                    i = document.createElement("script");
                                i.type = "text/javascript", i.innerHTML = r, e.contentWindow.document.body.innerHTML = "".concat(a), e.contentWindow.document.body.appendChild(i)
                            } else e.contentWindow.document.body.innerHTML = "".concat(a);
                            var c = document.createElement("script");
                            c.type = "text/javascript", c.innerHTML = "document.getElementsByTagName('body')[0].onclick = function(){\n            window.parent.postMessage({\n                type: 'muted_indicator_play',\n            }, '*')\n        }", e.contentWindow.document.body.appendChild(c), e.contentWindow.document.body.style = "padding:0;margin:0;overflow:hidden;"
                        }
                    };
                    var o = player_configs.controls.filter((function(e) {
                        return "play-large" !== e
                    }));
                    Te && Me && o.length && player.on("controlsshown", (function() {
                        rt || on()
                    })), n.onclick = function() {
                        on()
                    };
                    var a = document.querySelector('button[data-plyr="play"].plyr__control--overlaid');
                    a && To(a, "disabled"), e.appendChild(n), rt = !1
                }

                function dn() {
                    if (!Ne) {
                        var e = document.querySelector(".plyr--video");
                        if (e && e.classList.add("plyr--force-hide-controls"), "" !== player_configs.mutedIndicatorBackgroundColor) tt.style.setProperty("--muted-indicator-background", player_configs.mutedIndicatorBackgroundColor);
                        else {
                            var t = rn(player_configs.primaryColor);
                            t.push(player_configs.mutedIndicatorOpacity), tt.style.setProperty("--muted-indicator-background", "rgba(".concat(t.join(","), ")"))
                        }
                        "" !== player_configs.mutedIndicatorTextColor ? tt.style.setProperty("--muted-indicator-text", player_configs.mutedIndicatorTextColor) : tt.style.setProperty("--muted-indicator-text", player_configs.controlsColor), tt.style.setProperty("--muted-indicator-border-size", player_configs.mutedIndicatorBorderSize + "px");
                        var n = {
                            default: ln,
                            impact: cn,
                            custom: sn
                        };
                        window.player_configs.mutedIndicatorAnimation || (window.player_configs.mutedIndicatorAnimation = "default"), n[window.player_configs.mutedIndicatorAnimation](), player_configs.mutedIndicatorFontSize && function() {
                            var e, t = document.querySelectorAll("button.panda-muted-indicator-item span");
                            if (t.length) {
                                var n = (e = player_configs.mutedIndicatorFontSize) <= 21 ? "small-text" : e >= 22 && e <= 27 ? "normal-text" : e >= 28 ? "large-text" : void 0,
                                    o = {
                                        "small-text": [4, 4],
                                        "normal-text": [6, 4],
                                        "large-text": [6, 8]
                                    },
                                    a = "\n    button.panda-muted-indicator-item span.".concat(n, " {\n        font-size: ").concat(player_configs.mutedIndicatorFontSize, "px;\n    }");
                                player_configs.mutedIndicatorFontSize > 18 && (a += "\n        @media(max-width: 680px) {\n            button.panda-muted-indicator-item span.".concat(n, " {\n                font-size: ").concat(player_configs.mutedIndicatorFontSize - o[n][0], "px;\n            }\n        }\n        @media(max-width: 380px) {\n            button.panda-muted-indicator-item span.").concat(n, " {\n                font-size: ").concat(player_configs.mutedIndicatorFontSize - o[n][0] - o[n][1], "px;\n            }\n        }\n        "));
                                var r = document.createElement("style");
                                r.innerText = a, document.head.appendChild(r), t.forEach((function(e) {
                                    e.classList.add(n)
                                }))
                            }
                        }()
                    }
                }

                function un() {
                    var e = document.querySelector('button[data-plyr="play"].plyr__control--overlaid');
                    if (e) {
                        $e && To(e, "disabled"), Ne && (To(e, "disabled"), e.style.visibility = "hidden"), e.style.width = "".concat(player_configs.bigPlayButtonSize, "px"), e.style.height = "".concat(player_configs.bigPlayButtonSize, "px"), e.style.display = "flex", e.style.justifyContent = "center", e.style.alignItems = "center";
                        var t = e.querySelector("svg");
                        t && (t.style.width = "".concat(player_configs.bigPlayButtonIconSize, "px"), t.style.height = "".concat(player_configs.bigPlayButtonIconSize, "px"), t.style.display = "flex", player_configs.bigPlayButtonIconSize > 50 && (t.style.paddingLeft = "3px"), t.style.alignItems = "center")
                    }
                }

                function pn() {
                    var e;
                    fe ? (e = !1, fetch(G + "/sharelock?j=" + fe, {
                        method: "GET"
                    }).then((function(e) {
                        if (e.ok) return e.json();
                        throw new Error("Not 2xx response")
                    })).then((function(t) {
                        t && t.status ? (le = t.video_external_id, e = !0) : (le = "cd676325-3f2d-4ad5-b95c-c2a683d7b0cc", pe = "vz-ded14ebd-85a")
                    })).catch((function(e) {
                        le = "cd676325-3f2d-4ad5-b95c-c2a683d7b0cc", pe = "vz-ded14ebd-85a"
                    })).finally((function() {
                        document.querySelector("video > source").src = "https://b-".concat(pe).concat($, "/").concat(le, "/playlist.m3u8").concat(e ? "?sharelock=" + fe + "version" + Date.now() : ""), window.pandatag("videoHtmlLoaded", !0), On()
                    }))) : ye ? fetch("".concat(K, "/").concat(pe, "/comparison/").concat(ye, ".json"), {
                        method: "GET"
                    }).then((function(e) {
                        if (e.ok) return e.json();
                        throw new Error("Not 2xx response")
                    })).then((function(e) {
                        if ("COMPLETED" === e.status) le = e.winner_video_id;
                        else {
                            var t = e.videos,
                                n = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1) * t.length);
                            le = t[n]
                        }
                    })).catch((function(e) {
                        le = "cd676325-3f2d-4ad5-b95c-c2a683d7b0cc", pe = "vz-ded14ebd-85a"
                    })).finally((function() {
                        var e = document.querySelector("video > source"),
                            t = "https://b-" + pe + $ + "/" + le + "/playlist.m3u8";
                        Me && window.player_configs && window.player_configs.initQuality && 0 !== window.player_configs.initQuality && (t = "https://b-".concat(pe).concat($, "/").concat(le, "/").concat(window.player_configs.initQuality, "p/video.m3u8")), e.src = t, window.pandatag("videoHtmlLoaded", !0), On()
                    })) : On();
                    var t = K + "/" + pe + "/config.json";
                    "true" === xe && (t += "?date=" + (new Date).getTime()), fetch(t, {
                        method: "GET"
                    }).then((function(e) {
                        if (e.ok) return e.json();
                        throw new Error("Not 2xx response")
                    })).then((function(e) {
                        var t = e;
                        Object.keys(player_configs).forEach((function(e) {
                            if (Object.keys(t).includes(e)) {
                                if ("controls" === e) {
                                    var n = t.controls.findIndex((function(e) {
                                        return "volume" === e
                                    })); - 1 !== n && t.controls.splice(n, 0, "mute")
                                }
                                "fbPixel" === e && "string" == typeof t.fbPixel && (t.fbPixel = t.fbPixel ? [t.fbPixel] : []), player_configs[e] = t[e]
                            }
                        })), player_configs.timeDisplayType = t.timeDisplayType
                    })).finally((function() {
                        mn(["applyColors", "setupControls"]), pandatag("configLibraryLoaded", !0), Te || Rn()
                    }))
                }

                function mn(e) {
                    var t = {
                        applyColors: function() {
                            pandatag("applyColors", (function() {
                                Z.searchParams.get("color") && ("#" === Z.searchParams.get("color").charAt(0) ? player_configs.primaryColor = Z.searchParams.get("color") : player_configs.primaryColor = "#" + Z.searchParams.get("color")), tt.style.setProperty("--plyr-color-main", player_configs.primaryColor), tt.style.setProperty("--plyr-captions-text-color", player_configs.captionsColor), tt.style.setProperty("--plyr-captions-background", player_configs.captionsBackgroundColor), tt.style.setProperty("--plyr-video-control-color", player_configs.controlsColor), tt.style.setProperty("--plyr-video-control-color-hover", player_configs.controlsColor), tt.style.setProperty("--plyr-menu-color", player_configs.menuColor), tt.style.setProperty("--live-indicator-color", player_configs.liveColor)
                            }))
                        },
                        setupControls: function() {
                            pandatag("setupControls", (function() {
                                if ("online" === Je) {
                                    var e = ["current-time", "duration", "captions", "rewind", "fast-forward"];
                                    Ye || e.push("progress"), at || e.push("settings");
                                    var t = player_configs.controls.filter((function(t) {
                                        return !e.includes(t)
                                    }));
                                    player_configs.controls = t
                                }
                                if (player_configs.alternativeProgress) {
                                    var n = ["progress"];
                                    player_configs.controls = player_configs.controls.filter((function(e) {
                                        return !n.includes(e)
                                    }))
                                }
                                qt.controls = player_configs.controls
                            }))
                        },
                        setupThumb: function() {
                            pandatag("setupThumb", (function() {
                                var e = Ct,
                                    t = document.querySelector("video"),
                                    n = Z.searchParams.get("thumbnail");
                                if ($e) Ho();
                                else {
                                    if (n) return t.setAttribute("poster", n), void io(n);
                                    if (e && e.thumb && "" !== e.thumb) {
                                        var o = "";
                                        xe ? e.thumb.includes("".concat($, "/")) ? (o = e.thumb + "?date=" + (new Date).getTime(), t.setAttribute("poster", o)) : (o = J + "/" + pe + "/" + e.thumb + "?date=" + (new Date).getTime(), t.setAttribute("poster", o)) : (e.thumb.includes("".concat($, "/")) ? (o = e.thumb, t.setAttribute("poster", e.thumb)) : (o = J + "/" + pe + "/" + e.thumb, t.setAttribute("poster", o)), e.thumb.includes("".concat($, "/")) ? (o = e.thumb, t.setAttribute("poster", e.thumb)) : (o = J + "/" + pe + "/" + e.thumb, t.setAttribute("poster", o))), io(o)
                                    } else {
                                        var a = "https://b-" + pe + $ + "/" + le + "/thumbnail.jpg";
                                        t.setAttribute("poster", a), io(a), setTimeout((function() {
                                            var e = document.querySelector(".plyr__poster");
                                            e && To(e, "thumbnail-blur")
                                        }), 0)
                                    }
                                }
                            }))
                        },
                        applySettingsUnloadedPlayer: function() {
                            pandatag("applySettingsUnloadedPlayer", (function() {
                                player_configs.controls.includes("play-large") && un(), pandaLoad.applyColors(), player_configs.mutedIndicatorIcon ? dn() : player_configs.muted && player_configs.smallMutedIcon && an();
                                var e = null;
                                try {
                                    e = document.querySelector(".panda-muted-indicator-item")
                                } catch (e) {}
                                e && (e.onclick = function() {
                                    document.querySelector("#video-container").remove(), window.pandaLoad.initPlayerLoading()
                                })
                            }))
                        },
                        initPlayerLoading: function() {
                            pandatag("initPlayerLoading", (function() {
                                delete window.pandaLoad, window.pandaLoad = {}, ot = !1, Ne = !0, Te = !0, Ft(), $t(), pn()
                            }))
                        }
                    };
                    e.forEach((function(e) {
                        t[e]()
                    }))
                }

                function fn() {
                    var e = Y + "/" + pe + "/" + le + "-live.json?nocache=" + Date.now();
                    fetch(e, {
                        method: "GET"
                    }).then((function(e) {
                        if (e.ok) return e.json();
                        throw new Error("Not 2xx response")
                    })).then((function(e) {
                        if (ee.status = e.chat_status, ee.id = e.chat_id, me = ee.id, Je = e.status, Ye = !!e.active_dvr, e.title, e.thumb) {
                            var t = document.getElementsByClassName("live-thumb")[0];
                            t.getElementsByTagName("img")[0].src = J + "/" + pe + "/" + e.thumb, So(t, "disabled")
                        } else So(document.getElementsByClassName("live-offline-badge")[0], "disabled");
                        "online" === e.status ? function t() {
                            var n = "https://b-" + pe + $ + "/" + le + "/playlist.m3u8.live?nocache=" + (new Date).getTime() + (Ce ? "&live_without_cdn=1" : "") + (Ot ? "&custom_referrer=" + Ot : "");
                            fetch(n, {
                                method: "GET"
                            }).then((function(t) {
                                if (!t.ok) throw new Error("Not 2xx response");
                                window.player_configs.muted = !0, window.player_configs.autoplay = !0, window.player_configs.saveProgress = !1;
                                var n = document.getElementsByClassName("live-thumb")[0];
                                n && To(n, "disabled");
                                var o = document.getElementsByClassName("live-offline-badge")[0];
                                if (o && To(o, "disabled"), e.bitrate) try {
                                    Xe = e.bitrate.map((function(e) {
                                        return parseInt(e.replace("p", ""))
                                    })), at = !0
                                } catch (e) {
                                    Xe = [], at = !1, console.log("Error on parsing live BitRates", e)
                                }
                                pn()
                            })).catch((function(e) {
                                setTimeout(t, 2e3)
                            }))
                        }() : "finished" === e.status || "finished_imported" === e.status ? (To(document.getElementsByClassName("live-thumb")[0], "disabled"), To(document.getElementsByClassName("live-offline-badge")[0], "disabled"), pn()) : setTimeout(fn, 5e3)
                    })).catch((function(e) {
                        try {
                            So(document.getElementsByClassName("live-offline-badge")[0], "disabled")
                        } catch (e) {}
                        setTimeout(fn, 5e3)
                    }))
                }

                function yn(e) {
                    var t = [];
                    t = e ? document.getElementById(e) ? [document.getElementById(e)] : document.getElementsByClassName(e) : document.getElementsByClassName("cta-element");
                    for (var n = 0; n < t.length; n++) t[n] && t[n].parentNode && t[n].parentNode.removeChild(t[n])
                }

                function hn() {
                    var e = document.getElementsByClassName("plyr--html5")[0];
                    yn("pause-cta");
                    var t, n = B(player_configs.ctas.filter((function(e) {
                        return "pause" === e.type
                    })));
                    try {
                        var o = function() {
                            var n = t.value,
                                o = document.createElement("div");
                            To(o, "pause-cta"), To(o, "cta-overlay"), To(o, "disabled"), To(o, "cta-element"), o.style = "z-index: 5;", o.id = n.id;
                            var a = document.createElement("iframe");
                            if (a.id = "".concat(n.id, "_iframe"), a.onload = function() {
                                    Jt(a.contentWindow.document.body);
                                    var e = document.getElementById("".concat(n.id, "_iframe")),
                                        t = /<script>(.|\n)*?<\/script>/gm,
                                        o = n.script.match(t),
                                        r = n.script.replace(t, "");
                                    if (o && o.length) {
                                        var i = o[0].replace("<script>", "").replace("<\/script>", ""),
                                            c = document.createElement("script");
                                        c.type = "text/javascript", c.innerHTML = i, e.contentWindow.document.body.innerHTML = "".concat(r), e.contentWindow.document.body.appendChild(c)
                                    } else e.contentWindow.document.body.innerHTML = "".concat(r);
                                    e.contentWindow.document.body.style = "padding:0;margin:0"
                                }, o.appendChild(a), n.skipButton) {
                                var r = document.createElement("button");
                                r.style = "z-index: 6;", r.innerHTML = mt[ut].keepWatching, To(r, "cta-skip-button"), r.onclick = function() {
                                    window.postMessage({
                                        type: "play"
                                    }, "*")
                                }, o.appendChild(r)
                            }
                            var i = document.querySelector('button[data-plyr="play"].plyr__control--overlaid');
                            i && (i.style.zIndex = 10), To(o, "disabled"), e.appendChild(o)
                        };
                        for (n.s(); !(t = n.n()).done;) o()
                    } catch (e) {
                        n.e(e)
                    } finally {
                        n.f()
                    }
                }

                function vn() {
                    var e = document.getElementsByClassName("plyr--html5")[0];
                    yn("end-cta");
                    var t = player_configs.ctas.find((function(e) {
                        return "end" === e.type
                    }));
                    if (t) {
                        var n = document.createElement("div");
                        n.id = "end-cta", To(n, "cta-overlay"), To(n, "disabled"), To(n, "cta-element"), t.maxZIndex ? n.style.zIndex = 99999 : n.style = "z-index: 5;";
                        var o = document.createElement("iframe");
                        o.id = "".concat(t.id, "_iframe"), o.onload = function() {
                            Jt(o.contentWindow.document.body);
                            var e = document.getElementById("".concat(t.id, "_iframe")),
                                n = /<script>(.|\n)*?<\/script>/gm,
                                a = t.script.match(n),
                                r = t.script.replace(n, "");
                            if (a && a.length) {
                                var i = a[0].replace("<script>", "").replace("<\/script>", ""),
                                    c = document.createElement("script");
                                c.type = "text/javascript", c.innerText = i, e.contentWindow.document.body.innerHTML = "".concat(r), e.contentWindow.document.body.appendChild(c)
                            } else e.contentWindow.document.body.innerHTML = "".concat(r);
                            e.contentWindow.document.body.style = "padding:0;margin:0"
                        }, n.appendChild(o);
                        var a = document.querySelector('button[data-plyr="play"].plyr__control--overlaid');
                        a && (a.style.zIndex = 10), To(n, "disabled"), e.appendChild(n), window.onEnd = function() {
                            So(n, "disabled")
                        }
                    }
                }

                function gn(e) {
                    var t = Math.floor(e / 3600),
                        n = Math.floor((e - 3600 * t) / 60),
                        o = Math.floor(e - 3600 * t - 60 * n);
                    return t < 10 && (t = "0" + t), n < 10 && (n = "0" + n), o < 10 && (o = "0" + o), "00" == t ? n + ":" + o : t + ":" + n + ":" + o
                }

                function bn() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = '<svg style="width:24px;height:24px" fill="white" viewBox="0 0 24 24"><path fill="white" d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" /></svg>',
                        n = document.createElement("div");
                    n.id = "bookmarks-container", To(n, "panda-bookmarks-div");
                    var o = document.createElement("div");
                    To(o, "panda-bookmarks-list-wrapper"), To(o, "disabled"), o.style.cssText = "z-index:9999;", o.innerHTML = '<div class="panda-bookmarks-list-title">'.concat(mt[ut].chapters, "</div>");
                    var a = document.createElement("ul");
                    To(a, "panda-bookmarks-list"), player_configs.bookMarks.sort((function(e, t) {
                        return e.time - t.time
                    })).forEach((function(e, t) {
                        var n = document.createElement("li"),
                            o = document.createElement("span"),
                            r = "index" === window.player_configs.bookmarksLabel ? t + 1 : gn(e.time);
                        o.innerHTML = "<strong>" + r + "</strong> " + e.title, n.appendChild(o), n.onclick = function() {
                            window.postMessage({
                                type: "currentTime",
                                parameter: e.time
                            }, "*"), window.postMessage({
                                type: "play"
                            }, "*")
                        }, a.appendChild(n)
                    }));
                    var r = document.createElement("button");
                    r.setAttribute("class", "panda-bookmarks-button"), t = t.replace(/white/gm, "var(--plyr-video-control-color)"), r.innerHTML = t, o.appendChild(a), n.appendChild(r);
                    var i = document.querySelector(".plyr__menu button");

                    function c(e) {
                        var t = Ro(".bookmarks_inside_menu_wrapper");
                        r.contains(e.target) || (To(o, "disabled"), t && To(t, "disabled"), So(r, "active-bookmark"), nt = !1)
                    }
                    i && (i.onclick = function(e) {
                        To(o, "disabled"), So(r, "active-bookmark"), nt = !1
                    }), r.onclick = function() {
                        (nt = !nt) ? (So(o, "disabled"), To(r, "active-bookmark")) : (To(o, "disabled"), So(r, "active-bookmark"))
                    }, document.removeEventListener("click", c, !0), document.addEventListener("click", c, !0), n.appendChild(o);
                    var l = player_configs.bookMarks.sort((function(e, t) {
                            return e.time - t.time
                        })),
                        s = l.map((function(e, t) {
                            var n = l[t + 1];
                            return {
                                start: e.time,
                                title: e.title,
                                end: n ? n.time : 2147483647
                            }
                        }));
                    try {
                        window.pb && (window.pb.ev_config.chapters = s, window.pb.reloadChapters())
                    } catch (e) {}
                    if (!e) return en(n, "bookmarks");
                    Bo({
                        control_name: "bookmarks",
                        element: n
                    }, window.player.elements.controls, e)
                }

                function wn(e) {
                    var t = e.split(":");
                    if (t.length < 2) return null;
                    var n = parseInt(t[0], 10),
                        o = parseInt(t[1], 10),
                        a = parseFloat(t[2]);
                    return 2 == t.length && (n = 0, o = parseInt(t[0], 10), a = parseFloat(t[1])), 3600 * n + 60 * o + a
                }

                function _n() {
                    try {
                        var e = document.getElementById("content-ai-dialog");
                        e && e.remove()
                    } catch (e) {}
                }

                function Cn() {
                    _n();
                    try {
                        var e = function(e) {
                                var n = a[e];
                                document.getElementById("question-enunciate").textContent = n.enunciate;
                                var o = document.getElementById("answer-options");
                                o.innerHTML = "", n.options.forEach((function(n, a) {
                                    var i = document.createElement("li");
                                    if (i.textContent = n.text, null !== r[e]) {
                                        var c = r[e];
                                        i.classList.add("answered"), a === c.userSelected ? i.style.border = c.isCorrect ? "2px solid green" : "2px solid red" : a === c.correctOption ? i.style.border = "2px solid green" : (i.style.opacity = "0.6", i.style.pointerEvents = "none"), i.style.cursor = "default"
                                    } else i.addEventListener("click", (function() {
                                        return t(a)
                                    }));
                                    o.appendChild(i)
                                })), document.getElementById("questions-indicator").textContent = "".concat(e + 1, "/").concat(a.length)
                            },
                            t = function(t) {
                                var n = a[o].options.findIndex((function(e) {
                                        return e.correct
                                    })),
                                    i = a[o].options[t].correct;
                                ! function(e, t, n) {
                                    var o = a[e].options.findIndex((function(e) {
                                        return e.correct
                                    }));
                                    r[e] = {
                                        userSelected: t,
                                        correctOption: o,
                                        isCorrect: n
                                    }
                                }(o, t, i), e(o), window.parent.postMessage({
                                    message: "panda_ai_quiz",
                                    video: le,
                                    question_index: o + 1,
                                    total_questions: a.length,
                                    user_selected_answer: t + 1,
                                    correct_answer: n + 1,
                                    is_correct: i
                                }, "*")
                            },
                            n = document.createElement("div");
                        n.id = "content-ai-dialog", n.innerHTML = '<div id="modal-ai">\n            <header>\n                <p class="title-ai-text">'.concat(mt[ut].questions, '</p>\n                <button class="close-ai-button">x</button>\n            </header>\n            <div id="content-ai">\n                <p id="question-enunciate"></p>\n                <ul id="answer-options"></ul>\n            </div>\n            <div id="questions-footer">\n                <button id="questions-prev-button"><</button>\n                <span id="questions-indicator"></span>\n                <button id="questions-next-button">></button>\n            </div>\n        </div>'), document.getElementsByClassName("plyr")[0].insertAdjacentElement("afterbegin", n), document.getElementsByClassName("close-ai-button")[0].addEventListener("click", (function() {
                            _n()
                        }));
                        var o = 0,
                            a = player_configs.ai.questions_data,
                            r = new Array(a.length).fill(null),
                            i = document.getElementById("questions-prev-button"),
                            c = document.getElementById("questions-next-button");
                        i.addEventListener("click", (function() {
                            o > 0 && (o--, e(o))
                        })), c.addEventListener("click", (function() {
                            o < a.length - 1 && (o++, e(o))
                        })), e(o)
                    } catch (e) {
                        console.log(e, "err")
                    }
                }

                function kn() {
                    _n();
                    var e, t, n, o = (e = player_configs.ai.mindmap_data, t = "mindmap ".concat(e.theme, "\n"), n = 0, function e(o, a) {
                        var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                            i = "N".concat(n++),
                            c = o.text ? o.text : "Node ".concat(i);
                        if (c = function(e) {
                                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20;
                                return e.replace(new RegExp("(.{1,".concat(t, "})(\\s+|$)"), "g"), "$1\n")
                            }(c), r || (t += "".concat(a).concat(i, '("').concat(c, '")\n')), o.children) {
                            var l = a + "    ";
                            o.children.forEach((function(n) {
                                t += "".concat(a, "    ").concat(i, " --\x3e "), e(n, l)
                            }))
                        }
                    }(e, "", !0), t);
                    try {
                        var a = document.createElement("div"),
                            r = '<div id="abstract-footer">\n            <div></div>\n            <button id="mindmap-download-button">'.concat(mt[ut].download_button, "</button>\n        </div>");
                        a.id = "content-ai-dialog", a.innerHTML = '<div id="modal-ai">\n            <header>\n                <p class="title-ai-text">'.concat(mt[ut].mindmap, '</p>\n                <button class="close-ai-button">x</button>\n            </header>\n            <div id="content-ai">\n                <pre id="mindmap-container" class="mermaid"></pre>\n            </div>\n            ').concat(player_configs.ai.pdf_generated ? r : "", "\n        </div>"), document.getElementsByClassName("plyr")[0].insertAdjacentElement("afterbegin", a);
                        var i = document.getElementById("mindmap-container");
                        i.textContent = o, window.mermaid.run({
                            querySelector: "#mindmap-container"
                        }), document.getElementsByClassName("close-ai-button")[0].addEventListener("click", (function() {
                            _n()
                        }));
                        var c = Panzoom(i, {
                            maxScale: 5
                        });
                        c.pan(0, 0), i.parentElement.addEventListener("wheel", c.zoomWithWheel), player_configs.ai.pdf_generated && document.getElementById("mindmap-download-button").addEventListener("click", (function() {
                            var e = "".concat(K, "/").concat(pe, "/").concat(le, "/mindmap.pdf");
                            fetch(e).then((function(e) {
                                return e.blob()
                            })).then((function(e) {
                                var t = window.URL.createObjectURL(e),
                                    n = document.createElement("a");
                                n.href = t, n.download = "mindmap.pdf", document.body.appendChild(n), n.click(), n.remove()
                            })).catch((function(e) {
                                console.error("Error while trying to download ebook pdf: ", e)
                            }))
                        })), setTimeout((function() {
                            document.querySelectorAll(".mermaid .mindmap-node").forEach((function(e, t) {
                                e.setAttribute("data-nodeid", "N".concat(t)), e.addEventListener("click", (function() {
                                    var e = function(e, t) {
                                        var n = null;

                                        function o(e) {
                                            var t = 1;
                                            if (e.children && e.children.length > 0) {
                                                var n, a = B(e.children);
                                                try {
                                                    for (a.s(); !(n = a.n()).done;) t += o(n.value)
                                                } catch (e) {
                                                    a.e(e)
                                                } finally {
                                                    a.f()
                                                }
                                            }
                                            return t
                                        }
                                        return function t(a, r) {
                                            if ("N".concat(r) === e) return n = a.time, !0;
                                            if (a.children && a.children.length > 0) {
                                                var i, c = r + 1,
                                                    l = B(a.children);
                                                try {
                                                    for (l.s(); !(i = l.n()).done;) {
                                                        var s = i.value;
                                                        if (t(s, c)) return !0;
                                                        c += o(s)
                                                    }
                                                } catch (e) {
                                                    l.e(e)
                                                } finally {
                                                    l.f()
                                                }
                                            }
                                            return !1
                                        }(t, 0), n
                                    }(this.getAttribute("data-nodeid"), player_configs.ai.mindmap_data);
                                    window.postMessage({
                                        type: "currentTime",
                                        parameter: wn(e)
                                    }, "*"), window.postMessage({
                                        type: "play"
                                    }, "*"), _n()
                                }))
                            }))
                        }), 1e3)
                    } catch (e) {
                        console.log("err", e)
                    }
                }

                function xn() {
                    _n();
                    try {
                        var e = player_configs.ai.abstract_data,
                            t = document.createElement("div");
                        t.id = "content-ai-dialog", t.innerHTML = '<div id="modal-ai">\n            <header>\n                <p class="title-ai-text">'.concat(mt[ut].abstract, '</p>\n                <button class="close-ai-button">x</button>\n            </header>\n            <div id="content-ai">\n                <div id="abstract-content">\n                    ').concat((n = e, n.replace(/^### (.+)$/gm, "<h3>$1</h3>").replace(/^## (.+)$/gm, "<h2>$1</h2>").replace(/^# (.+)$/gm, "<h1>$1</h1>").replace(/^\- (.+)$/gm, "<li>$1</li>").split(/\n/).join("").replace(/<\/li><li>/g, "</li>\n<li>").replace(/<li>(.+?)<\/li>/g, "<ul><li>$1</li></ul>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a target=_blank href="$2">$1</a>').replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")), '\n                </div>\n            </div>\n            <div id="abstract-footer">\n                <button id="abstract-copy-button">').concat(mt[ut].copy_button, '</button>\n                <button id="abstract-download-button">').concat(mt[ut].download_button, "</button>\n            </div>\n        </div>"), document.getElementsByClassName("plyr")[0].insertAdjacentElement("afterbegin", t), document.getElementsByClassName("close-ai-button")[0].addEventListener("click", (function() {
                            _n()
                        })), document.getElementById("abstract-copy-button").addEventListener("click", (function() {
                            navigator.clipboard.writeText(e)
                        })), document.getElementById("abstract-download-button").addEventListener("click", (function() {
                            if (player_configs.ai.pdf_generated) {
                                var t = "".concat(K, "/").concat(pe, "/").concat(le, "/abstract.pdf");
                                fetch(t).then((function(e) {
                                    return e.blob()
                                })).then((function(e) {
                                    var t = window.URL.createObjectURL(e),
                                        n = document.createElement("a");
                                    n.href = t, n.download = "abstract.pdf", document.body.appendChild(n), n.click(), n.remove()
                                })).catch((function(e) {
                                    console.error("Error while trying to download ebook pdf: ", e)
                                }))
                            } else ! function(e) {
                                var t = new jspdf.jsPDF,
                                    n = 10,
                                    o = function(e, o) {
                                        var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                                        t.setFontSize(o), t.splitTextToSize(e, 180).forEach((function(e) {
                                            n > 280 && (t.addPage(), n = 10), a ? t.text("• ".concat(e), 10, n) : t.text(e, 10, n), n += o + 2
                                        }))
                                    };
                                e.split("\n").forEach((function(e) {
                                    e.startsWith("# ") ? o(e.substring(2), 22) : e.startsWith("## ") ? o(e.substring(3), 18) : e.startsWith("### ") ? o(e.substring(4), 14) : e.startsWith("- ") ? o(e.substring(2), 12, !0) : o(e, 12)
                                })), t.save("".concat(le, "_ebook.pdf"))
                            }(e)
                        }))
                    } catch (e) {
                        console.log(e, "err")
                    }
                    var n
                }

                function En(e) {
                    var t, n = [],
                        o = "",
                        a = "",
                        r = B(e.split("\n"));
                    try {
                        for (r.s(); !(t = r.n()).done;) {
                            var i = t.value,
                                c = (i = i.replace(/\r/g, "").trim()).match(/^\d+$/),
                                l = i.match(/^((\d{2}:)?\d{2}:\d{2}\.\d{3}) --> ((\d{2}:)?\d{2}:\d{2}\.\d{3})$/);
                            !c && l ? ("" !== o && (n.push({
                                text: o,
                                time: a
                            }), o = "", a = ""), a = l[1]) : c || "" === i || i.toUpperCase().match(/WEBVTT|X-TIMESTAMP/) || (o += i + " ")
                        }
                    } catch (e) {
                        r.e(e)
                    } finally {
                        r.f()
                    }
                    return "" !== o && n.push({
                        text: o.trim(),
                        time: a
                    }), n
                }

                function Tn(e, t) {
                    var n, o = "",
                        a = "",
                        r = "",
                        i = !1,
                        c = B(e.split("\n"));
                    try {
                        for (c.s(); !(n = c.n()).done;) {
                            var l = n.value;
                            l = l.replace(/\r/g, "").trim(), /^\d+$/.test(l);
                            var s = l.match(/^((\d{2}:)?\d{2}:\d{2}\.\d{3}) --> ((\d{2}:)?\d{2}:\d{2}\.\d{3})/);
                            if (s) o = s[1], a = s[3], r = "", i = !0;
                            else if (i && "" !== l) r += l + " ";
                            else if (i && "" === l) {
                                if (o && a && "" !== r.trim()) try {
                                    var d = new VTTCue(Sn(o), Sn(a), r.trim());
                                    t.addCue(d)
                                } catch (e) {
                                    console.log(e)
                                }
                                i = !1
                            }
                        }
                    } catch (e) {
                        c.e(e)
                    } finally {
                        c.f()
                    }
                }

                function Sn(e) {
                    var t = e.split(":"),
                        n = 0;
                    return 3 === t.length ? (n += 3600 * parseFloat(t[0]), n += 60 * parseFloat(t[1]), n += parseFloat(t[2])) : 2 === t.length && (n += 60 * parseFloat(t[0]), n += parseFloat(t[1])), n
                }

                function Ln() {
                    return Ln = q(P().mark((function e() {
                        var t, n, o;
                        return P().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = player_configs.subtitles.map((function(e) {
                                        var t = "".concat(Q, "/").concat(pe, "/").concat(le, "/").concat(e.srclang, ".vtt");
                                        return fetch(t).then((function(t) {
                                            if (!t.ok) throw new Error("Error downloading subtitles for ".concat(e.srclang));
                                            return t.text()
                                        })).then((function(e) {
                                            return En(e)
                                        }))
                                    })), n = [], e.next = 4, Promise.all(t);
                                case 4:
                                    (o = e.sent) && o.length && o.forEach((function(e) {
                                        return n = [].concat(S(n), S(e))
                                    })), n && n.length && (player_configs.subtitles_search = n);
                                case 7:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    }))), Ln.apply(this, arguments)
                }

                function In(e) {
                    if (function(e) {
                            var t = Object.keys(e).every((function(e) {
                                return e.endsWith("_data")
                            }));
                            if (t) return player_configs.ai.questions = !0, player_configs.ai.mindmap = !0, player_configs.ai.abstract = !0, !0;
                            var n = Object.keys(e).filter((function(e) {
                                    return "pdf_generated" !== e && !e.endsWith("_data")
                                })),
                                o = n.every((function(t) {
                                    return !1 === e[t]
                                }));
                            return !o
                        }(e)) {
                        var t = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zm32 152c6.4 0 12.1 3.8 14.7 9.6l42 96 14 32c3.5 8.1-.1 17.5-8.2 21.1s-17.5-.2-21.1-8.2L239.5 304H176.5l-9.8 22.4c-3.5 8.1-13 11.8-21.1 8.2s-11.8-13-8.2-21.1l14-32 42-96c2.5-5.8 8.3-9.6 14.7-9.6zm17.5 96L208 231.9 190.5 272h35.1zM336 176c8.8 0 16 7.2 16 16V320c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16z"/></svg>',
                            n = document.createElement("button");
                        n.setAttribute("class", "panda-ai-link plyr__control plyr__controls__item"), n.setAttribute("type", "button"), n.onclick = function(e) {
                            Nn("context-menu-ai");
                            var t = document.getElementById("context-menu-ai"),
                                n = document.getElementsByClassName("plyr__controls")[0];
                            n.classList.contains("plyr-controls-fix-index") ? n.classList.remove("plyr-controls-fix-index") : n.classList.add("plyr-controls-fix-index"), t.classList.contains("active") ? t.classList.remove("active") : t.classList.add("active"), e.stopPropagation()
                        }, t = t.replace(/white/gm, "var(--plyr-video-control-color)"), n.innerHTML = "\n        ".concat(t, '\n        <div id="context-menu-ai" class="plyr__menu__container"><div><div role="menu">\n            ').concat(Object.keys(e).filter((function(e) {
                            return "pdf_generated" !== e
                        })).map((function(t) {
                            if (e[t] && !t.match(/_data/)) return '<button type="button" data-ai="'.concat(t, '" class="plyr__control ai_button plyr__control--forward"><span>').concat(mt[ut][t], "</span></button>")
                        })).join(""), "\n        </div></div></div>\n    "), en(n, "panda-ai")
                    }
                }

                function Mn(e) {
                    window.open(e, "_blank")
                }

                function Pn() {
                    document.querySelector("#video-container").getBoundingClientRect().height, document.querySelector(".live-chat-container").style.height = "100%"
                }

                function An() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "add",
                        t = document.querySelector(".panda-live-chat.plyr__control.plyr__controls__item");
                    t && t.classList[e]("new-message-badge")
                }

                function qn(e) {
                    var t = e.currentTarget.getAttribute("data-ai"),
                        n = {
                            mindmap: kn,
                            questions: Cn,
                            abstract: xn
                        };
                    n[t] && n[t]()
                }

                function Bn(e) {
                    e || document.write("Unauthorized"), fetch(X + "/" + pe + "/" + e + "-drm.json?nocache=" + Date.now(), {
                        method: "GET"
                    }).then((function(e) {
                        if (e.ok) return e.json();
                        throw new Error("Not 2xx response")
                    })).then((function(t) {
                        var n;
                        pandaLoad.setupThumb();
                        var o = mt[ut].watermark_question;
                        t && null !== (n = t.config_player) && void 0 !== n && n.watermark_question && (o = t.config_player.watermark_question);
                        var a = document.querySelector("video");
                        To(a, "blur");
                        var r = document.getElementsByClassName("loading-icon")[0];
                        To(r, "disabled");
                        var i = null,
                            c = document.querySelector("video");
                        if (c && 0 !== c.offsetHeight) {
                            var l = c.offsetHeight / 2 - 15;
                            i = 'style="top: '.concat(l, 'px !important"')
                        }
                        var s = '<form class="container-drm '.concat(i || "", '">') + '<div class="title-wrapper"><h2 id="drm-question" ' + (player_configs.controlsColor ? 'style="color: ' + player_configs.controlsColor + '"' : "") + ">" + o.replace(/<\/?[^>]+(>|$)/g, "") + '</h2></div><div class="input-wrapper"><input id="drm-answer"/><button id="drm-button" ' + (player_configs.primaryColor ? 'style="background-color: ' + player_configs.primaryColor + '"' : "") + '><div class="drm-search-icon"><svg viewBox="-112 0 512 512" ' + (player_configs.controlsColor ? 'fill="' + player_configs.controlsColor + '"' : "") + ' ><path d="M64 352L160 256 64 160 96 128 224 256 96 384 64 352Z" /></svg></div><div class="drm-loading-icon disabled"><svg x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"><path ' + (player_configs.controlsColor ? 'fill="' + player_configs.controlsColor + '"' : "") + ' d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" /></path></svg></div></button></div></form>';
                        ! function(e, t) {
                            var n = document.createElement("div");
                            for (n.innerHTML = t; n.children.length > 0;) e.appendChild(n.children[0])
                        }(document.getElementById("video-container"), s);
                        var d, u = document.querySelector("form");

                        function p(t) {
                            var n = document.getElementById("drm-answer"),
                                o = document.getElementsByClassName("drm-search-icon")[0],
                                i = document.getElementsByClassName("drm-loading-icon")[0];
                            t.preventDefault(), So(i, "disabled"), To(o, "disabled"), fetch(G + "/drm/token/?jwt=1&key=" + n.value.trim() + "&drm_group_id=" + e, {
                                method: "GET"
                            }).then((function(e) {
                                if (e.ok) return e.json();
                                throw new Error("Not 2xx response")
                            })).then((function(t) {
                                Oe = t.jwt, So(i, "disabled"), u.remove(), So(r, "disabled"), So(a, "blur");
                                try {
                                    localStorage.setItem(e, n.value.trim())
                                } catch (e) {}
                                var o = document.querySelector("video > source"),
                                    c = "https://b-".concat(pe).concat($, "/").concat(le, "/playlist.m3u8?watermark=").concat(Oe);
                                o.src = c, window.pandatag("videoHtmlLoaded", !0), On()
                            })).catch((function(t) {
                                To(i, "disabled"), So(o, "disabled"), n.focus();
                                try {
                                    localStorage.removeItem(e)
                                } catch (e) {}
                            }))
                        }
                        u.onsubmit = p.bind(u);
                        try {
                            d = localStorage.getItem(e)
                        } catch (e) {}
                        d && (document.getElementById("drm-answer").value = d, p({
                            preventDefault: function() {}
                        })), setTimeout((function() {
                            document.getElementById("drm-answer").focus()
                        }), 500)
                    }))
                }

                function Nn(e) {
                    var t = document.querySelector(".panda-bookmarks-list-wrapper"),
                        n = Ro(".bookmarks_inside_menu_wrapper");
                    if ("bookmarks" !== e) {
                        if (t && !n && !t.classList.contains("disabled")) {
                            var o = document.querySelector(".panda-bookmarks-button");
                            To(t, "disabled"), So(o, "active-bookmark"), nt = !1
                        }
                        n && !n.classList.contains("disabled") && (To(n, "disabled"), nt = !1)
                    }
                    var a = document.querySelector("#context-menu-ai");
                    a && a.classList.contains("active") && "context-menu-ai" !== e && document.querySelector(".panda-ai-link").click();
                    var r = document.querySelector('.plyr__control[data-plyr="settings"][aria-expanded="true"]');
                    r && "settings" !== e && r.click();
                    var i = document.querySelector("#context-menu");
                    i && !i.classList.contains("disabled") && "context-menu" !== e && i.classList.add("disabled");
                    var c = Ro(".plyr__custom-controls-menu button"),
                        l = Ro(".plyr__custom-controls-menu-content");
                    c && "custom-controls-menu" !== e && (c.setAttribute("aria-expanded", !1), l.classList.toggle("open", !1), l.classList.remove("on-btn-hover"), l.classList.remove("on-btn-click"))
                }

                function On() {
                    var e;
                    Gn(), e = K + "/" + pe + "/" + le + ".json", e += "?date=" + (new Date).getTime(), fetch(e, {
                        method: "GET"
                    }).then((function(e) {
                        if (e.ok) return e.json();
                        throw new Error("Not 2xx response")
                    })).then((function(e) {
                        var t, n;
                        ! function(e) {
                            var t = e.lastReplaced;
                            if (t && "true" !== xe) {
                                var n = localStorage.getItem("lastConfigReplaced_".concat(le));
                                (!n || n !== t) && (localStorage.setItem("lastConfigReplaced_".concat(le), t), xe = "true")
                            }
                        }(e), Ct = e, e.video_offline_enabled && (player_configs.video_offline_enabled = e.video_offline_enabled), (e.ai || 0 === Object.keys(e).length) && (0 !== Object.keys(e).length && (player_configs.ai = e.ai), Te && e.ai && function() {
                            var e = K + "/" + pe + "/" + le + "-ai.json";
                            "true" === xe && (e += "?date=" + (new Date).getTime()), fetch(e, {
                                method: "GET"
                            }).then((function(e) {
                                if (e.ok) return e.json();
                                throw new Error("Not 2xx response")
                            })).then((function(e) {
                                0 === Object.keys(player_configs.ai).length && (player_configs.ai = {}), player_configs.ai.mindmap_data = (e || {}).mindmap || !1, e.questions && (player_configs.ai.questions_data = e.questions), e.abstract && (player_configs.ai.abstract_data = e.abstract), document.querySelector(".panda-ai-link") || In(player_configs.ai)
                            }))
                        }(e.profile)), e.subtitles && (player_configs.subtitles = e.subtitles), e.bookMarks && (player_configs.bookMarks = e.bookMarks), e.videoRedirect && (player_configs.videoRedirect = e.videoRedirect), e.lipsync_info && (player_configs.lipsync_info = e.lipsync_info), e.ctas && (player_configs.ctas = e.ctas), e.profile ? (window.player_configs.profile = e.profile, t = e.profile, n = K + "/" + pe + "/profiles/" + t + ".json", "true" === xe && (n += "?date=" + (new Date).getTime()), fetch(n, {
                            method: "GET"
                        }).then((function(e) {
                            if (e.ok) return e.json();
                            throw new Error("Not 2xx response")
                        })).then((function(e) {
                            for (var t = 0, n = Object.keys(e); t < n.length; t++) {
                                var o = n[t];
                                if ("controls" === o) {
                                    if (!e[o]) continue;
                                    var a = e.controls.findIndex((function(e) {
                                        return "volume" === e
                                    })); - 1 !== a && e.controls.splice(a, 0, "mute"), e.vsl && e.vsl.timeDisplayType ? player_configs.timeDisplayType = e.vsl.timeDisplayType : (e.vsl && !e.vsl.timeDisplayType || e.vsl && "current" == e.vsl.timeDisplayType) && (player_configs.timeDisplayType = "CURRENT_TOTAL_TIME"), player_configs[o] = e[o]
                                } else "vsl" === o || "colors" === o || "saveProgress" === o || "general" === o ? null != e[o] && null != e[o] && ("vsl" === o && delete e[o].pandaBranding, "" == e[o].fbPixel && delete e[o].fbPixel, "" == e[o].gtagIds && delete e[o].gtagIds, Object.hasOwnProperty.call(e[o], "trialWarning") && delete e[o].trialWarning, window.player_configs = I(I({}, window.player_configs), e[o])) : "hideControlsOnStart" === o && (window.player_configs.hideControlsOnStart = e[o]);
                                if (window.player_configs.autoplay) {
                                    var r = document.querySelector("video");
                                    r && (r.autoplay = !0)
                                }
                                window.player_configs.mutedIndicatorIcon && (player_configs.muted = !0), e.general && e.general.default_speed && (window.player_configs.defaultSpeed = e.general.default_speed)
                            }
                        })).catch((function(e) {
                            console.log("Error: falied to fetch video profile", e)
                        })).finally((function() {
                            pandatag("configProfileLoaded", !0),
                                function(e) {
                                    if (!e) return pandatag("configMutedIndicatorLoaded", !0), void(Te || Rn());
                                    var t = K + "/" + pe + "/tmi/" + e + ".json";
                                    "true" === xe && (t += "?date=" + (new Date).getTime()), fetch(t, {
                                        method: "GET"
                                    }).then((function(e) {
                                        if (e.ok) return e.json();
                                        throw new Error("Not 2xx response")
                                    })).then((function(e) {
                                        player_configs.customMutedIndicatorData = e
                                    })).catch((function(e) {
                                        console.log("Error: falied to fetch video muted indicator")
                                    })).finally((function() {
                                        pandatag("configMutedIndicatorLoaded", !0), Te || Rn()
                                    }))
                                }(player_configs.customMutedIndicatorId)
                        }))) : (pandatag("configMutedIndicatorLoaded", !0), pandatag("configProfileLoaded", !0)), mn(["setupThumb"]), e.defaultSubtitle && (player_configs.defaultSubtitle = e.defaultSubtitle), e.customPixels && (player_configs.customPixels = e.customPixels)
                    })).catch((function() {
                        pandatag("configProfileLoaded", !0), pandatag("configMutedIndicatorLoaded", !0), pandatag("setupThumb", (function() {
                            if ("online" !== Je) {
                                var e = document.querySelector("video"),
                                    t = Z.searchParams.get("thumbnail");
                                if (t) return e.setAttribute("data-poster", t), void io(t);
                                e.setAttribute("data-poster", "https://b-" + pe + $ + "/" + le + "/thumbnail.jpg"), io("https://b-" + pe + $ + "/" + le + "/thumbnail.jpg")
                            }
                            setTimeout((function() {
                                var e = document.querySelector(".plyr__poster");
                                e && To(e, "thumbnail-blur")
                            }), 0)
                        }))
                    })).finally((function() {
                        if (pandatag("configVideoLoaded", !0), !Te) {
                            var e = Ct ? JSON.parse(JSON.stringify(Ct)) : {},
                                t = {
                                    LIBRARY_ID: pe,
                                    EMBED_DOMAIN: $,
                                    VIDEO_ID: le,
                                    THUMBS_URL: J,
                                    REFRESH_CONFIG: xe
                                };
                            Object.assign(e, t);
                            var n = F.setThumbnailUrl(e);
                            window.thumbUrl = n, Rn()
                        }
                    })), Te && bo()
                }

                function Rn() {
                    mn(["applyColors", "applySettingsUnloadedPlayer", "initPlayerLoading"]);
                    var e = window.pandaLoad,
                        t = e.configLibraryLoaded,
                        n = e.configVideoLoaded,
                        o = e.configMutedIndicatorLoaded,
                        a = e.configProfileLoaded;
                    t && n && o && a && (F.createUnloadedPlayerContainer(window.thumbUrl), io(window.thumbUrl), F.wireUpEvents(), Ho())
                }

                function Hn() {
                    return Dn.apply(this, arguments)
                }

                function Dn() {
                    return (Dn = q(P().mark((function e() {
                        var t;
                        return P().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t = cast.framework.CastContext.getInstance().getCurrentSession()) {
                                        e.next = 5;
                                        break
                                    }
                                    return e.next = 4, cast.framework.CastContext.getInstance().requestSession();
                                case 4:
                                    t = cast.framework.CastContext.getInstance().getCurrentSession();
                                case 5:
                                    return e.abrupt("return", t);
                                case 6:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })))).apply(this, arguments)
                }

                function Fn() {
                    return jn.apply(this, arguments)
                }

                function jn() {
                    return (jn = q(P().mark((function e() {
                        var t, n, o, a, r, i;
                        return P().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0, e.next = 3, Hn();
                                case 3:
                                    return t = e.sent, n = document.querySelector("video"), o = n.getElementsByTagName("source")[0].src, ce && o.includes("token=") && (a = o.split("token=")[1].split("&")[0], o = o.replace(a, co())), window.player.pause(), (r = new chrome.cast.media.MediaInfo(o)).contentType = "application/x-mpegurl", i = new chrome.cast.media.LoadRequest(r), e.next = 13, t.loadMedia(i);
                                case 13:
                                    Vn(window.player.currentTime), zn(), e.next = 19;
                                    break;
                                case 17:
                                    e.prev = 17, e.t0 = e.catch(0);
                                case 19:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [0, 17]
                        ])
                    })))).apply(this, arguments)
                }

                function zn() {
                    var e = new cast.framework.RemotePlayer,
                        t = new cast.framework.RemotePlayerController(e);
                    t.addEventListener(cast.framework.RemotePlayerEventType.ANY_CHANGE, (function(e) {
                        "PLAYING" == e.value && window.player.play(), "PAUSED" == e.value && window.player.pause(), "currentTime" == e.field && Math.abs(e.value - window.player.currentTime) >= 5 && (window.player.currentTime = e.value), "isConnected" != e.field || e.value || Un()
                    })), window.player.on("play", (function() {
                        e.isPaused && t.playOrPause()
                    })), window.player.on("pause", (function() {
                        !1 === e.isPaused && t.playOrPause()
                    })), window.player.on("seeked", (function() {
                        var t = window.player.currentTime;
                        Math.abs(t - e.currentTime) >= 5 && Vn(t)
                    }))
                }

                function Vn(e) {
                    var t = new cast.framework.RemotePlayer,
                        n = new cast.framework.RemotePlayerController(t);
                    t.currentTime = e, n.seek()
                }

                function Un() {
                    var e = cast.framework.CastContext.getInstance().getCurrentSession();
                    e && e.endSession(!0);
                    var t = document.getElementsByClassName("chromecast-btn");
                    t && (t[0].innerHTML = '<svg viewBox="100 -900 800 800"><path d="M481-480Zm340 320H601q0-15-1-30t-3-30h224v-520H141v60q-15-2-30-3t-30-1v-56q0-24.75 17.625-42.375T141-800h680q24.75 0 42.375 17.625T881-740v520q0 24.75-17.625 42.375T821-160Zm-740 0v-104q41.667 0 70.833 30.333Q181-203.333 181-160H81Zm200 0q0-84.66-58-144.33Q165-364 81-364v-60q108.643 0 184.321 77.5Q341-269 341-160h-60Zm160 0q0-75-28-141.5t-77-116q-49-49.5-114.5-78T81-524v-60q87 0 163.5 33.5t133.5 91q57 57.5 90 135T501-160h-60Z" fill="'.concat(player_configs.controlsColor, '" /></svg>')), wt = !1, ce && window.location.reload()
                }

                function Wn() {
                    if (player_configs.fbPixel && player_configs.fbPixel.length) {
                        try {
                            player_configs.fbPixel, "undefined" == typeof fbq && function(e, t, n, o, a, r, i) {
                                e.fbq || (a = e.fbq = function() {
                                    a.callMethod ? a.callMethod.apply(a, arguments) : a.queue.push(arguments)
                                }, e._fbq || (e._fbq = a), a.push = a, a.loaded = !0, a.version = "2.0", a.queue = [], (r = t.createElement(n)).async = !0, r.src = "https://connect.facebook.net/en_US/fbevents.js", (i = t.getElementsByTagName(n)[0]).parentNode.insertBefore(r, i))
                            }(window, document, "script")
                        } catch (e) {
                            console.log("Error in fbp init", e)
                        }
                        var e, t = B(player_configs.fbPixel);
                        try {
                            for (t.s(); !(e = t.n()).done;) {
                                var n = e.value;
                                try {
                                    n && (fbq("init", "".concat(n)), fbq("track", "PageView"))
                                } catch (e) {}
                            }
                        } catch (e) {
                            t.e(e)
                        } finally {
                            t.f()
                        }
                    }
                    if (player_configs.gtagIds && player_configs.gtagIds.length) try {
                        ! function() {
                            if (!document.getElementById("gtag-script")) {
                                var e = document.createElement("script");
                                e.id = "gtag-script", e.src = "https://www.googletagmanager.com/gtag/js?id=" + player_configs.gtagIds[0], e.async = !0, document.head.appendChild(e)
                            }
                            window.dataLayer = window.dataLayer || [], window.gtag = function() {
                                dataLayer.push(arguments)
                            }, gtag("js", new Date);
                            var t, n = B(player_configs.gtagIds);
                            try {
                                for (n.s(); !(t = n.n()).done;) {
                                    var o = t.value;
                                    gtag("config", o)
                                }
                            } catch (e) {
                                n.e(e)
                            } finally {
                                n.f()
                            }
                            gtag("event", "page_view", {
                                video_id: le,
                                library_id: "b-" + pe
                            })
                        }()
                    } catch (e) {
                        console.log("Error in gtag init", e)
                    }
                    var o, a = player_configs.customPixels.filter((function(e) {
                            return "view" === e.conditionType
                        })),
                        r = B(a);
                    try {
                        for (r.s(); !(o = r.n()).done;) {
                            var i = o.value,
                                c = new Function(i.script);
                            try {
                                c()
                            } catch (e) {}
                        }
                    } catch (e) {
                        r.e(e)
                    } finally {
                        r.f()
                    }
                }

                function Zn() {
                    var e;

                    function t() {
                        return (t = q(P().mark((function e() {
                            var t, o, a, r;
                            return P().wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (!Ce) {
                                            e.next = 2;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 2:
                                        if (t = [], player_configs.videoRedirect && t.push(player_configs.videoRedirect), player_configs.ctas && player_configs.ctas.forEach((function(e) {
                                                "video" === e.type && e.metadata && e.metadata.videoRedirectExternalIds && t.push.apply(t, S(e.metadata.videoRedirectExternalIds))
                                            })), t && t.length && t.flat(), !t.length) {
                                            e.next = 30;
                                            break
                                        }
                                        o = B(t), e.prev = 8, o.s();
                                    case 10:
                                        if ((a = o.n()).done) {
                                            e.next = 22;
                                            break
                                        }
                                        if (!(r = a.value)) {
                                            e.next = 20;
                                            break
                                        }
                                        return e.prev = 13, e.next = 16, n(r);
                                    case 16:
                                        e.next = 20;
                                        break;
                                    case 18:
                                        e.prev = 18, e.t0 = e.catch(13);
                                    case 20:
                                        e.next = 10;
                                        break;
                                    case 22:
                                        e.next = 27;
                                        break;
                                    case 24:
                                        e.prev = 24, e.t1 = e.catch(8), o.e(e.t1);
                                    case 27:
                                        return e.prev = 27, o.f(), e.finish(27);
                                    case 30:
                                    case "end":
                                        return e.stop()
                                }
                            }), e, null, [
                                [8, 24, 27, 30],
                                [13, 18]
                            ])
                        })))).apply(this, arguments)
                    }

                    function n(e) {
                        return o.apply(this, arguments)
                    }

                    function o() {
                        return o = q(P().mark((function e(t) {
                            var n, o, a, r, i, c, l, s, d, u, p, m, f, y;
                            return P().wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return n = K + "/" + pe + "/" + t + ".json", e.next = 3, fetch(n);
                                    case 3:
                                        return e.next = 5, e.sent.json();
                                    case 5:
                                        if (o = e.sent, !(a = o.profile)) {
                                            e.next = 16;
                                            break
                                        }
                                        return r = K + "/" + pe + "/profiles/" + a + ".json", e.prev = 9, e.next = 12, fetch(r);
                                    case 12:
                                        e.next = 16;
                                        break;
                                    case 14:
                                        e.prev = 14, e.t0 = e.catch(9);
                                    case 16:
                                        return i = "https://b-".concat(pe).concat($, "/").concat(t, "/playlist.m3u8"), c = [], e.prev = 18, e.next = 21, fetch(i);
                                    case 21:
                                        return e.next = 23, e.sent.text();
                                    case 23:
                                        if (l = e.sent) {
                                            s = l.split("\n"), d = B(s);
                                            try {
                                                for (d.s(); !(u = d.n()).done;)(p = u.value).includes(".m3u8") && c.push(p.split("/")[0])
                                            } catch (e) {
                                                d.e(e)
                                            } finally {
                                                d.f()
                                            }
                                        }
                                        e.next = 29;
                                        break;
                                    case 27:
                                        e.prev = 27, e.t1 = e.catch(18);
                                    case 29:
                                        return e.prev = 29, e.next = 32, fetch(i + "?get_qualities=1");
                                    case 32:
                                        e.next = 36;
                                        break;
                                    case 34:
                                        e.prev = 34, e.t2 = e.catch(29);
                                    case 36:
                                        m = 0, f = c;
                                    case 37:
                                        if (!(m < f.length)) {
                                            e.next = 56;
                                            break
                                        }
                                        return y = f[m], e.prev = 39, e.next = 42, fetch("https://b-".concat(pe).concat($, "/").concat(t, "/").concat(y, "/video.m3u8"));
                                    case 42:
                                        e.next = 46;
                                        break;
                                    case 44:
                                        e.prev = 44, e.t3 = e.catch(39);
                                    case 46:
                                        return e.prev = 46, e.next = 49, fetch("https://".concat(pe, ".b-cdn.net/").concat(t, "/").concat(y, "/video0.ts"));
                                    case 49:
                                        e.next = 53;
                                        break;
                                    case 51:
                                        e.prev = 51, e.t4 = e.catch(46);
                                    case 53:
                                        m++, e.next = 37;
                                        break;
                                    case 56:
                                    case "end":
                                        return e.stop()
                                }
                            }), e, null, [
                                [9, 14],
                                [18, 27],
                                [29, 34],
                                [39, 44],
                                [46, 51]
                            ])
                        }))), o.apply(this, arguments)
                    }
                    window.player_configs = (M(M(M(M(M(M(M(M(M(M(e = {
                        controls: ["play-large", "play", "progress", "current-time", "duration", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
                        captionsBackgroundColor: "#000",
                        primaryColor: "#4874F1",
                        captionsColor: "#FFF",
                        menuColor: "#4a5464",
                        initDisabledControls: !1,
                        controlsColor: "#FFF",
                        pandaBranding: !de,
                        refCode: "",
                        fbPixel: [],
                        customPixels: [],
                        mutedIndicatorIcon: !1,
                        mutedIndicatorTextTop: "",
                        mutedIndicatorTextBottom: "",
                        mutedIndicatorSize: "small",
                        mutedIndicatorOpacity: .8,
                        muted: !1,
                        autoplay: !1,
                        disablePause: !1,
                        initQuality: 0,
                        alternativeProgress: !1,
                        alternativeProgress2xLimit: 20,
                        alternativeProgressDefaultVelocity: !1,
                        mutedIndicatorClickRestart: !0,
                        alternativeProgressVelocity: 5,
                        alternativeProgressHeight: 0,
                        liveColor: "#fc2d2d",
                        bookMarks: []
                    }, "customPixels", []), "bookmarksLabel", "index"), "ctas", []), "availableSpeeds", [.5, .75, 1, 1.25, 1.5, 2]), "defaultSpeed", 1), "default_speed", 1), "smartSearch", !1), "saveProgress", !0), "saveProgressScreen", !1), "saveProgressTitle", "Você já começou a assistir esse vídeo"), M(M(M(M(M(M(M(M(M(M(e, "saveProgressBackgroundOpacity", 1), "saveProgressButton1Title", "Continuar assistindo"), "saveProgressButton2Title", "Voltar ao início"), "hideControlsOnStart", $e), "defaultSubtitle", null), "startsWithSubtitle", !1), "restartAfterEnd", !1), "onlyLoopMuted", !1), "realtimeAnalytics", !1), "troubleshootDialog", !0), M(M(M(M(M(M(M(M(M(M(e, "disableForward", !1), "playOpensFullscreen", !1), "playOpensFullscreenNative", !1), "gtagIds", []), "showPreviewThumbs", !0), "smartAutoplay", !1), "disableSeeking", !1), "mutedIndicatorAnimation", "default"), "mutedIndicatorLoop", !1), "mutedIndicatorLoopDuration", 5), M(M(M(M(M(M(M(M(M(M(e, "mutedIndicatorFontSize", 22), "captionsFontSize", 20), "smallMutedIcon", !0), "bigPlayButtonSize", 100), "bigPlayButtonIconSize", 57), "mutedIndicatorBackgroundColor", ""), "mutedIndicatorTextColor", ""), "mutedIndicatorBorderSize", 2), "customMutedIndicatorData", ""), "customMutedIndicatorId", ""), M(M(M(M(M(M(M(M(e, "pauseThumbnail", ""), "endThumbnail", ""), "defaultLanguage", ""), "trialWarning", !1), "iosFakeFullscreen", !1), "ai", !1), "videoRedirect", null), "customName", null)), window.pandatag = function(e, n) {
                        if (window.pandaLoad[e] = n, pandaLoad = window.pandaLoad, pandaLoad.videoHtmlLoaded && pandaLoad.configLibraryLoaded && pandaLoad.configVideoLoaded && pandaLoad.configProfileLoaded && pandaLoad.configMutedIndicatorLoaded && pandaLoad.playerLoaded && !ot) {
                            Gn(), window.player_configs.controls.includes("cast") && "online" !== Je && (s = 10, u = setInterval((function() {
                                try {
                                    chrome.cast.isAvailable && !Ae && (clearInterval(u), cast.framework.CastContext.getInstance().setOptions({
                                        receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
                                        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
                                    }), e = '<svg viewBox="100 -900 800 800"><path d="M481-480Zm340 320H601q0-15-1-30t-3-30h224v-520H141v60q-15-2-30-3t-30-1v-56q0-24.75 17.625-42.375T141-800h680q24.75 0 42.375 17.625T881-740v520q0 24.75-17.625 42.375T821-160Zm-740 0v-104q41.667 0 70.833 30.333Q181-203.333 181-160H81Zm200 0q0-84.66-58-144.33Q165-364 81-364v-60q108.643 0 184.321 77.5Q341-269 341-160h-60Zm160 0q0-75-28-141.5t-77-116q-49-49.5-114.5-78T81-524v-60q87 0 163.5 33.5t133.5 91q57 57.5 90 135T501-160h-60Z" fill="'.concat(player_configs.controlsColor, '" /></svg>'), (t = document.createElement("button")).setAttribute("type", "button"), t.setAttribute("class", "plyr__controls__item plyr__control chromecast-btn"), e = e.replace(/white/gm, "var(--plyr-video-control-color)"), t.innerHTML = e, t.onclick = q(P().mark((function e() {
                                        return P().wrap((function(e) {
                                            for (;;) switch (e.prev = e.next) {
                                                case 0:
                                                    if (!wt) {
                                                        e.next = 4;
                                                        break
                                                    }
                                                    Un(), e.next = 6;
                                                    break;
                                                case 4:
                                                    return e.next = 6, Fn();
                                                case 6:
                                                case "end":
                                                    return e.stop()
                                            }
                                        }), e)
                                    }))), Bo({
                                        control_name: "cast",
                                        element: t
                                    }, window.player.elements.controls))
                                } catch (e) {}
                                var e, t;
                                s || clearInterval(u), s--
                            }), 1e3));
                            var o = null;
                            try {
                                o = localStorage.getItem("panda_video:" + le)
                            } catch (e) {}
                            player_configs.mutedIndicatorClickRestart && player_configs.saveProgress && !player_configs.saveProgressScreen && o && (player_configs.mutedIndicatorClickRestart = !1), pandaLoad.applyColors(), pandaLoad.setupControls(), Ne || pandaLoad.setupThumb(), window.player_configs.defaultLanguage && (ut = window.player_configs.defaultLanguage, qt.i18n = mt[ut]);
                            var a = player_configs.defaultSpeed;
                            qt.speed = {
                                    selected: player_configs.defaultSpeed,
                                    options: player_configs.availableSpeeds.map((function(e) {
                                        return parseFloat(e)
                                    })),
                                    turbo: a
                                }, player_configs.autoplay && (player_configs.muted = !0, qt.muted = !0, qt.autoplay = !0), player_configs.disableForward && (qt.keyboard.global = !1, qt.keyboard.focused = !1), pandaLoad.setupPlayer(qt), Ee ? !Ce && be && (Wn(), navigator.sendBeacon(lt + "/icon.gif?type=view&v=" + le + "&u=" + Ht + "&p=" + pe + "&referrer=" + encodeURIComponent(Ot) + "&visibily=" + !document[H] + V() + z())) : document.addEventListener(D, (function() {
                                    Ee || ve || oo(), qe || Ce || !be || (Wn(), navigator.sendBeacon(lt + "/icon.gif?type=view&v=" + le + "&u=" + Ht + "&p=" + pe + "&referrer=" + encodeURIComponent(Ot) + "&visibily=" + !document[H] + V() + z()), qe = !0)
                                }), !1), Jt(document),
                                function() {
                                    if (player_configs.controls.includes("rewind")) {
                                        var e = document.querySelectorAll('[data-plyr="rewind"]')[0];
                                        e && (e.innerHTML = '\n              <svg style="width:24px;height:24px" viewBox="0 0 50 50">\n                  <path fill="currentColor" d="M 7.984375 1.9863281 A 1.0001 1.0001 0 0 0 7 3 L 7 13 L 17 13 A 1.0001 1.0001 0 1 0 17 11 L 10.761719 11 C 14.363419 7.3233218 19.405802 5.0234375 25 5.0234375 C 36.109434 5.0234375 45 13.914004 45 25.023438 C 45 36.13287 36.109434 45.023438 25 45.023438 C 13.890566 45.023438 5 36.13287 5 25.023438 A 1.0001 1.0001 0 1 0 3 25.023438 C 3 37.204003 12.819434 47.023438 25 47.023438 C 37.180566 47.023438 47 37.204003 47 25.023438 C 47 12.842871 37.180566 3.0234375 25 3.0234375 C 18.685898 3.0234375 12.985264 5.693158 9 9.9414062 L 9 3 A 1.0001 1.0001 0 0 0 7.984375 1.9863281 z M 29.5 17 C 24.5 17 24.300781 21.7 24.300781 25 C 24.300781 27.5 24.1 33 29.5 33 C 34.4 33 34.699219 28.2 34.699219 25 C 34.699219 21.7 34.4 17 29.5 17 z M 19.5 17.099609 C 19.1 19.499609 17.4 19.999609 15 20.099609 L 15 21.599609 L 19.099609 21.599609 L 19.099609 32.900391 L 21 32.900391 L 21 17.099609 L 19.5 17.099609 z M 29.5 18.800781 C 33.4 18.800781 32.800781 24.699609 32.800781 25.099609 C 32.800781 28.399609 32.2 31.400391 29.5 31.400391 C 25.8 31.400391 26.199219 25.599609 26.199219 25.099609 C 26.199219 24.799609 25.6 18.800781 29.5 18.800781 z"/>\n              </svg>')
                                    }
                                    if (player_configs.controls.includes("fast-forward")) {
                                        var t = document.querySelectorAll('[data-plyr="fast-forward"]')[0];
                                        t && (t.innerHTML = '<svg style="width:24px;height:24px" viewBox="0 0 50 50">\n              <path fill="currentColor" d="M 41.984375 1.9863281 A 1.0001 1.0001 0 0 0 41 3 L 41 9.9414062 C 37.014556 5.692295 31.313104 3.0234375 25 3.0234375 C 12.819434 3.0234375 3 12.842871 3 25.023438 C 3 37.204003 12.819434 47.023438 25 47.023438 C 37.180566 47.023438 47 37.204003 47 25.023438 A 1.0001 1.0001 0 1 0 45 25.023438 C 45 36.13287 36.109434 45.023438 25 45.023438 C 13.890566 45.023438 5 36.13287 5 25.023438 C 5 13.914003 13.890566 5.0234375 25 5.0234375 C 30.593333 5.0234375 35.63652 7.322796 39.238281 11 L 33 11 A 1.0001 1.0001 0 1 0 33 13 L 43 13 L 43 3 A 1.0001 1.0001 0 0 0 41.984375 1.9863281 z M 29.5 17 C 24.5 17 24.300781 21.7 24.300781 25 C 24.300781 27.5 24.1 33 29.5 33 C 34.4 33 34.699219 28.2 34.699219 25 C 34.699219 21.7 34.4 17 29.5 17 z M 19.5 17.099609 C 19.1 19.499609 17.4 19.999609 15 20.099609 L 15 21.599609 L 19.099609 21.599609 L 19.099609 32.900391 L 21 32.900391 L 21 17.099609 L 19.5 17.099609 z M 29.5 18.800781 C 33.4 18.800781 32.800781 24.699609 32.800781 25.099609 C 32.800781 28.399609 32.2 31.400391 29.5 31.400391 C 25.8 31.400391 26.199219 25.599609 26.199219 25.099609 C 26.199219 24.799609 25.6 18.800781 29.5 18.800781 z"/>\n          </svg>')
                                    }
                                }(),
                                function() {
                                    var e = document.querySelector('.plyr__menu__container[id*="settings"] > div');
                                    e && (e.style = "max-height: calc(100vh - 50px);");
                                    var t = document.querySelector("video");
                                    window.innerWidth < 400 && (t.onclick = function() {
                                        window.player_configs.disablePause ? window.player.toggleControls(!0) : window.postMessage({
                                            type: "play_toggle"
                                        }, "*")
                                    }), window.player_configs.disablePause && window.player_configs.disableForward && t.addEventListener("click", (function(e) {
                                        e.preventDefault(), e.stopPropagation(), window.player.toggleControls(!0)
                                    }), !0)
                                }(),
                                function() {
                                    if (!player_configs.controls.includes("progress")) {
                                        var e = document.querySelector(".plyr__controls");
                                        e && To(e, "no-progress")
                                    }
                                }(), !player_configs.disableForward && st ? function() {
                                    var e = document.querySelector(".plyr__video-wrapper"),
                                        t = document.createElement("div");
                                    t.classList.add("panda-forward-wrapper");
                                    var n = document.createElement("div");
                                    n.id = "forward_touch";
                                    var o = function(e) {
                                        "forward_touch" !== e.target.id && "backward_touch" !== e.target.id || window.player.toggleControls(!0)
                                    };
                                    n.ondblclick = function() {
                                        window.player.forward()
                                    };
                                    var a = document.createElement("div");
                                    a.id = "backward_touch", a.ondblclick = function() {
                                        window.player.rewind()
                                    }, window.player_configs.controls.includes("play") ? (n.onclick = o, a.onclick = o) : (n.onclick = function() {
                                        window.player_configs.disablePause ? window.player.toggleControls(!0) : window.player.togglePlay()
                                    }, a.onclick = function() {
                                        window.player_configs.disablePause ? window.player.toggleControls(!0) : window.player.togglePlay()
                                    }), t.appendChild(a), t.appendChild(n), e.appendChild(t)
                                }() : st && (player_configs.controls.includes("play") || (document.querySelector("video").onclick = function() {
                                    window.player.togglePlay()
                                })), (_ = document.querySelector(".plyr__poster")) && (_.onclick = function() {
                                    window.postMessage({
                                        type: "play",
                                        parameter: 1
                                    }, "*")
                                }), player_configs.controls.includes("play-large") && un(), Te && !player_configs.muted || !player_configs.mutedIndicatorIcon || player_configs.saveProgress ? player_configs.initDisabledControls || !player_configs.muted || player_configs.mutedIndicatorIcon || player_configs.saveProgressScreen || !player_configs.smallMutedIcon || an() : dn();
                            var r = player_configs.controls.filter((function(e) {
                                return "play" !== e && "play-large" !== e
                            }));
                            ke && (g = ke, b = document.createElement("div"), (w = document.createElement("p")).innerText = g, b.setAttribute("class", "panda-title-wrapper"), b.appendChild(w), en(b, "title")), (!r || r && !r.length) && (document.querySelector(".plyr__controls").style.background = "none");
                            var i = Ro(Oo("current-time"));
                            ["REMAINING_TIME", "CURRENT_TIME", "HIDE_TIME"].includes(player_configs.timeDisplayType) && i && "online" !== Je && !he && (i.style.display = "none"), player_configs.alternativeProgress ? function() {
                                    var e = document.createElement("div");
                                    e.id = "wrapper-progress", To(e, "alternative-progress-wrapper");
                                    var t = document.createElement("div");
                                    To(t, "alternative-progress"), e.appendChild(t);
                                    var n = document.querySelector(".plyr__controls");
                                    n && (n.style = "padding-bottom: " + (player_configs.alternativeProgressHeight + 5) + "px");
                                    var o = document.getElementsByClassName("plyr--html5")[0];
                                    player_configs.mutedIndicatorIcon && To(e, "disabled"), o.appendChild(e)
                                }() : player_configs.controls.includes("progress") && function() {
                                    var e = null,
                                        t = document.querySelector(".plyr__progress__container input"),
                                        n = document.querySelector(".plyr__progress__container progress"),
                                        o = document.querySelector(".plyr__progress");
                                    t && t.style && (t.style.top = "-5px"), n.style.top = "4px", n.style.opacity = "0.01";
                                    var a = document.createElement("div");
                                    a.className = "plyr__pb", o.insertBefore(a, o.firstChild);
                                    var r = new d(".plyr__pb", ".plyr__progress__container input", {
                                        keyColor: "#ff7755",
                                        videoLength: 105,
                                        chapters: [],
                                        moments: [],
                                        onScrubbingChange: function(e, t) {
                                            var n = document.querySelector(".plyr__preview-thumb").offsetWidth,
                                                o = document.querySelector(".plyr__controls").offsetWidth,
                                                a = Math.max(n / 2, t);
                                            a = Math.min(o - n + n / 4, a), document.querySelector(".plyr__preview-thumb").style.left = a - 5.5 + "px"
                                        }
                                    });
                                    ! function(t) {
                                        !e && t && t.thumbnails && (e = t.thumbnails.showImage, t.thumbnails.showImage = function(n, o, a, r, i) {
                                            var c;
                                            n.width > 0 && n.height > 0 && (t.config.thumbnail.height = (c = n.width / n.height, Math.floor(thumbnail_width / c))), e.call(t.thumbnails, n, o, a, r, i)
                                        })
                                    }(window.player), window.player.on("loadedmetadata", (function() {
                                        r.SetDuration(window.player.duration)
                                    }));
                                    var i = navigator.deviceMemory <= 4 || navigator.hardwareConcurrency <= 4;
                                    setInterval((function() {
                                        r.SetCurrentProgress(window.player.currentTime), r.SetBufferProgress(window.player.duration * window.player.buffered)
                                    }), i ? 250 : 16), window.pb = r
                                }(),
                                function() {
                                    if (window.player_configs.controls.includes("fast-forward")) {
                                        var e = document.querySelector("button[data-plyr='fast-forward']");
                                        e && (e.style.marginRight = "auto")
                                    } else if (window.player_configs.controls.includes("play")) {
                                        var t = document.querySelector("button[data-plyr='play']");
                                        t && (t.style.marginRight = "auto")
                                    } else if (window.player_configs.controls.includes("rewind")) {
                                        var n = document.querySelector("button[data-plyr='rewind']");
                                        n && (n.style.marginRight = "auto")
                                    }
                                    if (player_configs.initDisabledControls) {
                                        var o = document.querySelector('[data-plyr="play"].plyr__control--overlaid');
                                        o && (o.style.display = "none");
                                        var a = document.querySelector(".plyr__controls");
                                        a && To(a, "disabled");
                                        var r = document.getElementById("wrapper-progress");
                                        r && To(r, "disabled")
                                    }
                                }(),
                                function() {
                                    if (window.player_configs.iosFakeFullscreen && Me) {
                                        var e = document.querySelector('button[data-plyr="fullscreen"]'),
                                            t = !1;
                                        if (e) {
                                            var n = e.cloneNode(!0);
                                            e.replaceWith(n), n.onclick = function() {
                                                if (t) {
                                                    window.parent.postMessage({
                                                        message: "panda_close_window_fullscreen",
                                                        video: le
                                                    }, "*");
                                                    var e = n.querySelector("svg.icon--pressed"),
                                                        o = n.querySelector("svg.icon--not-pressed");
                                                    e.style.display = "none", o.style.display = "block", t = !1
                                                } else {
                                                    window.parent.postMessage({
                                                        message: "panda_open_window_fullscreen",
                                                        video: le
                                                    }, "*");
                                                    var a = n.querySelector("svg.icon--pressed"),
                                                        r = n.querySelector("svg.icon--not-pressed");
                                                    a.style.display = "block", r.style.display = "none", t = !0
                                                }
                                            }
                                        }
                                    }
                                }(), window.addEventListener("keydown", (function(e) {
                                    if (e.key) {
                                        var t = {
                                            " ": function() {
                                                window.player.togglePlay()
                                            },
                                            k: function() {
                                                window.player.togglePlay()
                                            },
                                            ">": function() {
                                                var e = window.player_configs.availableSpeeds.sort((function(e, t) {
                                                        return e - t
                                                    })),
                                                    t = window.player.speed,
                                                    n = e.find((function(e) {
                                                        return e > t
                                                    }));
                                                n && (window.player.speed = n)
                                            },
                                            "<": function() {
                                                var e = window.player_configs.availableSpeeds.sort((function(e, t) {
                                                        return e - t
                                                    })),
                                                    t = window.player.speed,
                                                    n = e.reverse().find((function(e) {
                                                        return e < t
                                                    }));
                                                n && (window.player.speed = n)
                                            },
                                            ArrowUp: function() {
                                                window.player.volume < 1 && window.player.increaseVolume()
                                            },
                                            ArrowDown: function() {
                                                window.player.volume > 0 && window.player.decreaseVolume()
                                            },
                                            m: function() {
                                                window.player.toggleMute()
                                            },
                                            f: function() {
                                                window.player.fullscreen.toggle()
                                            }
                                        };
                                        t[e.key.toLowerCase()] && t[e.key]()
                                    }
                                })), Ct && (c = !!Ct.assistant_id, l = new URLSearchParams(document.location.search).get("insideIframe"), c && !l && function() {
                                    var e = '\n        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <g clip-path="url(#clip0_7339_26691)">\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 2.5C2.86739 2.5 2.74021 2.55268 2.64645 2.64645C2.55268 2.74021 2.5 2.86739 2.5 3V8.45266C2.96831 8.00702 3.51683 7.58339 4.10608 7.33086C4.23056 7.27751 4.36457 7.25 4.5 7.25H9C9.13261 7.25 9.25978 7.19732 9.35355 7.10355C9.44732 7.00978 9.5 6.88261 9.5 6.75V3C9.5 2.86739 9.44732 2.74022 9.35355 2.64645C9.25978 2.55268 9.13261 2.5 9 2.5H3ZM2.34621 11.7829C2.10887 12.1598 1.65084 12.3343 1.22284 12.2108C0.794757 12.0873 0.5 11.6955 0.5 11.25V3C0.5 2.33696 0.763392 1.70107 1.23223 1.23223C1.70107 0.763392 2.33696 0.5 3 0.5H9C9.66304 0.5 10.2989 0.763392 10.7678 1.23223C11.2366 1.70107 11.5 2.33696 11.5 3V6.75C11.5 7.41304 11.2366 8.04893 10.7678 8.51777C10.2989 8.98661 9.66304 9.25 9 9.25H4.72833C4.23771 9.51726 3.6862 10.0508 3.19565 10.6367C2.93789 10.9446 2.72265 11.2353 2.572 11.4491C2.49698 11.5555 2.43876 11.6418 2.40011 11.7001C2.3808 11.7293 2.36643 11.7514 2.35735 11.7655L2.34775 11.7804L2.34621 11.7829Z" fill="white"/>\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 6.75C12.5 6.19772 12.9477 5.75 13.5 5.75H15C15.663 5.75 16.2989 6.01339 16.7678 6.48223C17.2366 6.95107 17.5 7.58696 17.5 8.25V16.5C17.5 16.9045 17.2564 17.2691 16.8827 17.4239C16.509 17.5787 16.0789 17.4931 15.7929 17.2071L13.0858 14.5H9C8.33696 14.5 7.70107 14.2366 7.23223 13.7678C6.76339 13.2989 6.5 12.663 6.5 12V11.25C6.5 10.6977 6.94771 10.25 7.5 10.25C8.05228 10.25 8.5 10.6977 8.5 11.25V12C8.5 12.1326 8.55268 12.2598 8.64645 12.3536C8.74021 12.4473 8.86739 12.5 9 12.5H13.5C13.7652 12.5 14.0196 12.6054 14.2071 12.7929L15.5 14.0858V8.25C15.5 8.11739 15.4473 7.99022 15.3536 7.89645C15.2598 7.80268 15.1326 7.75 15 7.75H13.5C12.9477 7.75 12.5 7.30228 12.5 6.75Z" fill="white"/>\n                <path d="M5 3.86055C5 3.62095 5.26704 3.47803 5.46641 3.61094L7.10058 4.70038C7.2787 4.81913 7.2787 5.08087 7.10058 5.19962L5.46641 6.28906C5.26704 6.42197 5 6.27905 5 6.03944V3.86055Z" fill="white"/>\n            </g>\n            <defs>\n                <clipPath id="clip0_7339_26691">\n                    <rect width="18" height="18" fill="white"/>\n                </clipPath>\n            </defs>\n        </svg>\n    ';
                                    e = e.replace(/white/gm, "var(--plyr-video-control-color)");
                                    var t = document.createElement("button");
                                    t.setAttribute("class", "panda-live-chat plyr__control plyr__controls__item panda_assist_chat"), t.setAttribute("type", "button"), t.addEventListener("click", (function(e) {
                                        e.stopPropagation();
                                        var t = document.querySelector(".chat-overlay-container"),
                                            n = document.querySelector(".assist-chat-container"),
                                            o = document.getElementsByClassName("plyr")[0];
                                        if (n) n.classList.contains("disabled") ? (t && (t.style.display = "block"), n.classList.remove("disabled"), n.style.display = "flex") : (n.style.display = "none", t && (t.style.display = "none"), n.classList.add("disabled"));
                                        else {
                                            var a = document.createElement("div");
                                            a.classList.add("chat-overlay-container"), a.style.position = "fixed", a.style.width = "100%", a.style.height = "100%", a.style.zIndex = "10", a.addEventListener("click", (function() {
                                                var e;
                                                event.stopPropagation();
                                                var t = r.querySelector("iframe");
                                                if (t && (null == n || null === (e = n.classList) || void 0 === e || !e.contains("disabled"))) {
                                                    var o = (t.contentDocument || t.contentWindow.document).querySelector(".btn__header--close");
                                                    o && (o.click(), a.style.display = "none")
                                                }
                                            })), o.insertAdjacentElement("beforeend", a);
                                            var r = document.createElement("div");
                                            r.classList.add("assist-chat-container"), r.innerHTML = '<div style="position:relative;width:100%;height:100%"><iframe src="./assist_chat.html?v='.concat(le, "&l=").concat(pe, '" style="border:none;position:absolute;top:0;left:0;" width="100%" height="100%" fetchpriority="high"></iframe></<div>'), o.style.flexDirection = "row", o.insertAdjacentElement("beforeend", r)
                                        }
                                    })), t.innerHTML = e, en(t, "ai-assistant-chat")
                                }()), player_configs.smartSearch && player_configs.subtitles && (h = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="white" d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path></svg>', (v = document.createElement("button")).setAttribute("class", "panda-smart-search plyr__control plyr__controls__item"), v.setAttribute("type", "button"), v.onclick = function(e) {
                                    (function() {
                                        _n(),
                                            function() {
                                                Ln.apply(this, arguments)
                                            }();
                                        try {
                                            var e, t = document.createElement("div");
                                            t.id = "content-ai-dialog", t.innerHTML = '<div id="modal-ai" class="smart-search">\n            <header>\n                <input id="input-smart-search" placeholder="'.concat(mt[ut].smart_search_placeholder, '" />\n                <button class="close-ai-button">x</button>\n            </header>\n            <div id="content-ai">\n                <div id="search-content">\n                    <ul>\n                    </ul>\n                </div>\n            </div>\n        </div>'), document.getElementsByClassName("plyr")[0].insertAdjacentElement("afterbegin", t), document.getElementsByClassName("close-ai-button")[0].addEventListener("click", (function() {
                                                _n()
                                            })), document.getElementById("input-smart-search").addEventListener("input", (function(t) {
                                                clearTimeout(e);
                                                var o = t.target.value.trim();
                                                (o.length >= 2 || !o.length) && (e = setTimeout((function() {
                                                    n(o)
                                                }), 300))
                                            }));
                                            var n = function(e) {
                                                var t = player_configs.subtitles_search;
                                                if (t && (!t || t.length)) {
                                                    var n = new Fuse(t, {
                                                            includeScore: !0,
                                                            minMatchCharLength: 2,
                                                            threshold: .3,
                                                            limit: 20,
                                                            keys: [{
                                                                name: "text",
                                                                getFn: function(e) {
                                                                    return e.text ? e.text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() : ""
                                                                }
                                                            }]
                                                        }),
                                                        o = document.querySelector("#search-content > ul"),
                                                        a = "",
                                                        r = e ? n.search(e) : [];
                                                    r && r.length && r.forEach((function(e) {
                                                        var t = e.item;
                                                        a += "<li class=item-smart-search data-time=".concat(t.time, ">\n                        <p>").concat(t.text, "</p>\n                        <span>").concat(gn(wn(t.time)), "</span>\n                    </li>")
                                                    })), o.innerHTML = a, window.parent.postMessage({
                                                        message: "panda_smart_search",
                                                        video: le,
                                                        query: e
                                                    }, "*")
                                                }
                                            };
                                            document.querySelector("#search-content").addEventListener("click", (function(e) {
                                                if (e.target.classList.contains("item-smart-search") || e.target.closest(".item-smart-search")) {
                                                    var t = e.target.closest(".item-smart-search").getAttribute("data-time");
                                                    window.postMessage({
                                                        type: "currentTime",
                                                        parameter: wn(t)
                                                    }, "*"), window.postMessage({
                                                        type: "play"
                                                    }, "*"), _n()
                                                }
                                            }))
                                        } catch (e) {
                                            console.log(e, "err")
                                        }
                                    })(), e.stopPropagation()
                                }, h = h.replace(/white/gm, "var(--plyr-video-control-color)"), v.innerHTML = "\n        ".concat(h, "\n    "), en(v, "smart-search")), player_configs.ai && Object.keys(player_configs.ai).length && In(player_configs.ai), player_configs.bookMarks && player_configs.bookMarks.length > 0 && bn(), player_configs.ctas && player_configs.ctas.length > 0 && (player_configs.ctas = player_configs.ctas.map((function(e) {
                                    return e.script.includes("margin: 75px 30px 30px 30px") ? I(I({}, e), {}, {
                                        script: e.script.replace(/margin:\s*75px\s*30px\s*30px\s*30px/g, "margin: 75px 30px 78px 30px")
                                    }) : e
                                })), hn(), vn()), !player_configs.pandaBranding || player_configs.alternativeProgress || player_configs.mutedIndicatorIcon || de || (function() {
                                    if (!new URLSearchParams(document.location.search).get("insideIframe")) {
                                        var e = j.getSvgItem("panda_icon"),
                                            t = document.createElement("a");
                                        t.setAttribute("target", "_blank"), t.setAttribute("class", "panda-branding-link"), t.style.cssText = "\n    padding-bottom: 0 !important; \n    padding: calc(var(--plyr-control-spacing, 10px) * .7) !important;\n    margin-left: calc(var(--plyr-control-spacing, 10px) / 4) !important;\n  ", player_configs.refCode && "" !== player_configs.refCode ? t.setAttribute("href", "https://pandavideo.com.br?ref=" + player_configs.refCode) : t.setAttribute("href", "https://pandavideo.com.br?utm_source=player&utm_campaign=logo"), t.innerHTML = '<svg id="panda-brand" width="100" height="20" viewBox="0 0 523 116" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.84 106.728V50.664C3.84 49.192 3.872 48.104 3.936 47.4C4.064 46.696 4.352 45.896 4.8 45C5.696 43.272 7.84 42.408 11.232 42.408C14.624 42.408 16.896 42.856 18.048 43.752C19.264 44.584 19.968 45.832 20.16 47.496C22.592 44.168 26.4 42.504 31.584 42.504C36.832 42.504 41.792 44.968 46.464 49.896C51.136 54.824 53.472 60.552 53.472 67.08C53.472 73.608 51.136 79.336 46.464 84.264C41.856 89.192 36.928 91.656 31.68 91.656C26.432 91.656 22.624 90.184 20.256 87.24V106.632C20.256 108.104 20.192 109.192 20.064 109.896C20 110.6 19.712 111.4 19.2 112.296C18.752 113.256 17.952 113.928 16.8 114.312C15.648 114.696 14.08 114.888 12.096 114.888C10.112 114.888 8.512 114.696 7.296 114.312C6.144 113.928 5.312 113.288 4.8 112.392C4.352 111.496 4.064 110.696 3.936 109.992C3.872 109.288 3.84 108.2 3.84 106.728ZM22.848 61.512C21.376 63.24 20.64 65.128 20.64 67.176C20.64 69.224 21.376 71.112 22.848 72.84C24.384 74.504 26.304 75.336 28.608 75.336C30.976 75.336 32.96 74.504 34.56 72.84C36.224 71.176 37.056 69.288 37.056 67.176C37.056 65.064 36.288 63.176 34.752 61.512C33.216 59.784 31.2 58.92 28.704 58.92C26.272 58.92 24.32 59.784 22.848 61.512ZM88.227 47.784C88.611 44.2 91.139 42.408 95.811 42.408C98.307 42.408 100.163 42.6 101.379 42.984C102.595 43.368 103.427 44.04 103.875 45C104.387 45.96 104.675 46.824 104.739 47.592C104.867 48.296 104.931 49.384 104.931 50.856V84.456C104.931 85.928 104.867 87.048 104.739 87.816C104.675 88.52 104.419 89.352 103.971 90.312C103.075 91.976 100.867 92.808 97.347 92.808C93.891 92.808 91.555 92.392 90.339 91.56C89.187 90.664 88.515 89.384 88.323 87.72C85.955 91.112 81.987 92.808 76.419 92.808C70.915 92.808 65.795 90.28 61.059 85.224C56.323 80.168 53.955 74.312 53.955 67.656C53.955 60.936 56.323 55.08 61.059 50.088C65.859 45.032 71.107 42.504 76.803 42.504C78.979 42.504 80.963 42.888 82.755 43.656C84.547 44.424 85.795 45.16 86.499 45.864C87.203 46.504 87.779 47.144 88.227 47.784ZM70.755 67.752C70.755 69.864 71.587 71.784 73.251 73.512C74.915 75.176 76.931 76.008 79.299 76.008C81.667 76.008 83.619 75.144 85.155 73.416C86.755 71.688 87.555 69.8 87.555 67.752C87.555 65.64 86.787 63.688 85.251 61.896C83.779 60.104 81.763 59.208 79.203 59.208C76.707 59.208 74.659 60.104 73.059 61.896C71.523 63.688 70.755 65.64 70.755 67.752ZM136.391 42.408C142.791 42.408 148.103 44.872 152.327 49.8C156.615 54.664 158.759 60.616 158.759 67.656V84.552C158.759 86.024 158.695 87.144 158.567 87.912C158.503 88.616 158.247 89.416 157.799 90.312C156.903 92.04 154.407 92.904 150.311 92.904C145.767 92.904 143.143 91.72 142.439 89.352C142.055 88.264 141.863 86.632 141.863 84.456V67.56C141.863 64.936 141.095 62.888 139.559 61.416C138.087 59.944 136.071 59.208 133.511 59.208C131.015 59.208 128.967 59.976 127.367 61.512C125.831 63.048 125.063 65.064 125.063 67.56V84.552C125.063 86.024 124.999 87.144 124.871 87.912C124.807 88.616 124.519 89.416 124.007 90.312C123.175 92.04 120.711 92.904 116.615 92.904C112.583 92.904 110.119 92.04 109.223 90.312C108.775 89.352 108.487 88.52 108.359 87.816C108.295 87.048 108.263 85.928 108.263 84.456V50.472C108.263 49.064 108.295 48.008 108.359 47.304C108.487 46.536 108.807 45.704 109.319 44.808C110.215 43.208 112.679 42.408 116.711 42.408C120.615 42.408 123.015 43.144 123.911 44.616C124.551 45.704 124.871 47.016 124.871 48.552C125.127 48.104 125.703 47.464 126.599 46.632C127.495 45.8 128.359 45.128 129.191 44.616C131.367 43.144 133.767 42.408 136.391 42.408ZM196.049 21.384C196.561 20.424 197.425 19.752 198.641 19.368C199.857 18.984 201.457 18.792 203.441 18.792C205.489 18.792 207.121 18.984 208.337 19.368C209.553 19.752 210.385 20.424 210.833 21.384C211.345 22.344 211.633 23.208 211.697 23.976C211.825 24.68 211.889 25.768 211.889 27.24V84.552C211.889 86.024 211.825 87.144 211.697 87.912C211.633 88.616 211.345 89.416 210.833 90.312C209.873 92.04 207.153 92.904 202.673 92.904C198.257 92.904 195.793 91.336 195.281 88.2C192.593 91.272 188.849 92.808 184.049 92.808C178.289 92.808 173.041 90.312 168.305 85.32C163.569 80.264 161.201 74.408 161.201 67.752C161.201 61.032 163.569 55.144 168.305 50.088C173.105 45.032 178.353 42.504 184.049 42.504C188.785 42.504 192.465 44.104 195.089 47.304V27.144C195.089 25.672 195.121 24.584 195.185 23.88C195.313 23.112 195.601 22.28 196.049 21.384ZM180.497 73.512C182.161 75.24 184.177 76.104 186.545 76.104C188.913 76.104 190.865 75.24 192.401 73.512C194.001 71.784 194.801 69.896 194.801 67.848C194.801 65.736 194.033 63.784 192.497 61.992C191.025 60.2 189.009 59.304 186.449 59.304C183.889 59.304 181.841 60.2 180.305 61.992C178.769 63.72 178.001 65.64 178.001 67.752C178.001 69.864 178.833 71.784 180.497 73.512ZM248.048 47.784C248.432 44.2 250.96 42.408 255.632 42.408C258.128 42.408 259.984 42.6 261.2 42.984C262.416 43.368 263.248 44.04 263.696 45C264.208 45.96 264.496 46.824 264.56 47.592C264.688 48.296 264.752 49.384 264.752 50.856V84.456C264.752 85.928 264.688 87.048 264.56 87.816C264.496 88.52 264.24 89.352 263.792 90.312C262.896 91.976 260.688 92.808 257.168 92.808C253.712 92.808 251.376 92.392 250.16 91.56C249.008 90.664 248.336 89.384 248.144 87.72C245.776 91.112 241.808 92.808 236.24 92.808C230.736 92.808 225.616 90.28 220.88 85.224C216.144 80.168 213.776 74.312 213.776 67.656C213.776 60.936 216.144 55.08 220.88 50.088C225.68 45.032 230.928 42.504 236.624 42.504C238.8 42.504 240.784 42.888 242.576 43.656C244.368 44.424 245.616 45.16 246.32 45.864C247.024 46.504 247.6 47.144 248.048 47.784ZM230.576 67.752C230.576 69.864 231.408 71.784 233.072 73.512C234.736 75.176 236.752 76.008 239.12 76.008C241.488 76.008 243.44 75.144 244.976 73.416C246.576 71.688 247.376 69.8 247.376 67.752C247.376 65.64 246.608 63.688 245.072 61.896C243.6 60.104 241.584 59.208 239.024 59.208C236.528 59.208 234.48 60.104 232.88 61.896C231.344 63.688 230.576 65.64 230.576 67.752ZM339.021 43.56C342.349 45.544 344.013 47.656 344.013 49.896C344.013 51.176 343.373 52.936 342.093 55.176L322.221 89.256C321.581 90.344 320.557 91.336 319.149 92.232C317.741 93.064 316.333 93.48 314.925 93.48C313.581 93.48 312.269 93.16 310.989 92.52C309.773 91.816 308.909 91.112 308.397 90.408L307.533 89.352L287.565 55.176C286.285 53.064 285.645 51.336 285.645 49.992C285.645 47.688 287.309 45.544 290.637 43.56C293.069 42.152 294.989 41.448 296.397 41.448C297.805 41.448 298.893 41.896 299.661 42.792C300.493 43.624 301.357 44.904 302.253 46.632L314.829 70.824L327.405 46.632C328.109 45.416 328.621 44.552 328.941 44.04C329.325 43.464 329.901 42.92 330.669 42.408C331.437 41.832 332.461 41.544 333.741 41.544C335.021 41.544 336.781 42.216 339.021 43.56ZM344.944 50.856C344.944 49.384 344.976 48.296 345.04 47.592C345.168 46.824 345.456 45.96 345.904 45C346.8 43.336 349.296 42.504 353.392 42.504C356.464 42.504 358.64 43.048 359.92 44.136C361.008 45.032 361.584 46.408 361.648 48.264C361.712 48.904 361.744 49.832 361.744 51.048V84.648C361.744 86.12 361.68 87.24 361.552 88.008C361.488 88.712 361.2 89.544 360.688 90.504C359.856 92.168 357.392 93 353.296 93C349.264 93 346.8 92.136 345.904 90.408C345.456 89.448 345.168 88.616 345.04 87.912C344.976 87.208 344.944 86.088 344.944 84.552V50.856ZM360.688 33.096C360.24 33.992 359.408 34.632 358.192 35.016C356.976 35.4 355.344 35.592 353.296 35.592C351.312 35.592 349.712 35.4 348.496 35.016C347.28 34.632 346.416 33.96 345.904 33C345.456 32.04 345.168 31.208 345.04 30.504C344.976 29.736 344.944 28.616 344.944 27.144C344.944 25.672 344.976 24.584 345.04 23.88C345.168 23.112 345.456 22.28 345.904 21.384C346.8 19.656 349.296 18.792 353.392 18.792C357.424 18.792 359.856 19.656 360.688 21.384C361.2 22.344 361.488 23.208 361.552 23.976C361.68 24.68 361.744 25.768 361.744 27.24C361.744 28.712 361.68 29.832 361.552 30.6C361.488 31.304 361.2 32.136 360.688 33.096ZM398.981 21.384C399.493 20.424 400.357 19.752 401.573 19.368C402.789 18.984 404.389 18.792 406.373 18.792C408.421 18.792 410.053 18.984 411.269 19.368C412.485 19.752 413.317 20.424 413.765 21.384C414.277 22.344 414.565 23.208 414.629 23.976C414.757 24.68 414.821 25.768 414.821 27.24V84.552C414.821 86.024 414.757 87.144 414.629 87.912C414.565 88.616 414.277 89.416 413.765 90.312C412.805 92.04 410.085 92.904 405.605 92.904C401.189 92.904 398.725 91.336 398.213 88.2C395.525 91.272 391.781 92.808 386.981 92.808C381.221 92.808 375.973 90.312 371.237 85.32C366.501 80.264 364.133 74.408 364.133 67.752C364.133 61.032 366.501 55.144 371.237 50.088C376.037 45.032 381.285 42.504 386.981 42.504C391.717 42.504 395.397 44.104 398.021 47.304V27.144C398.021 25.672 398.053 24.584 398.117 23.88C398.245 23.112 398.533 22.28 398.981 21.384ZM383.429 73.512C385.093 75.24 387.109 76.104 389.477 76.104C391.845 76.104 393.797 75.24 395.333 73.512C396.933 71.784 397.733 69.896 397.733 67.848C397.733 65.736 396.965 63.784 395.429 61.992C393.957 60.2 391.941 59.304 389.381 59.304C386.821 59.304 384.773 60.2 383.237 61.992C381.701 63.72 380.933 65.64 380.933 67.752C380.933 69.864 381.765 71.784 383.429 73.512ZM466.915 61.704C466.915 65.608 465.923 68.52 463.939 70.44C462.019 72.296 459.875 73.224 457.507 73.224H434.755C434.755 75.016 435.811 76.52 437.923 77.736C440.035 78.952 442.147 79.56 444.259 79.56C447.971 79.56 450.883 79.176 452.995 78.408L454.051 78.024C455.587 77.32 456.867 76.968 457.891 76.968C459.939 76.968 461.699 78.408 463.171 81.288C464.003 83.016 464.419 84.488 464.419 85.704C464.419 91.4 457.603 94.248 443.971 94.248C439.235 94.248 435.011 93.448 431.299 91.848C427.651 90.184 424.803 88.008 422.755 85.32C418.723 80.136 416.707 74.344 416.707 67.944C416.707 59.88 419.299 53.448 424.483 48.648C429.731 43.784 436.259 41.352 444.067 41.352C452.963 41.352 459.491 44.488 463.651 50.76C465.827 54.088 466.915 57.736 466.915 61.704ZM446.659 64.488C449.091 64.488 450.307 63.464 450.307 61.416C450.307 59.944 449.731 58.76 448.579 57.864C447.491 56.968 445.891 56.52 443.779 56.52C441.731 56.52 439.683 57.384 437.635 59.112C435.587 60.776 434.563 62.568 434.563 64.488H446.659ZM467.419 67.752C467.419 60.072 470.107 53.736 475.483 48.744C480.859 43.752 487.003 41.256 493.915 41.256C500.827 41.256 506.939 43.752 512.251 48.744C517.563 53.672 520.219 59.976 520.219 67.656C520.219 72.968 518.843 77.704 516.091 81.864C513.339 85.96 509.979 89 506.011 90.984C502.107 92.904 498.043 93.864 493.819 93.864C489.595 93.864 485.499 92.84 481.531 90.792C477.563 88.68 474.203 85.608 471.451 81.576C468.763 77.48 467.419 72.872 467.419 67.752ZM487.483 74.664C489.531 76.2 491.611 76.968 493.723 76.968C495.835 76.968 497.947 76.168 500.059 74.568C502.171 72.968 503.227 70.6 503.227 67.464C503.227 64.328 502.235 61.992 500.251 60.456C498.267 58.92 496.123 58.152 493.819 58.152C491.515 58.152 489.371 58.952 487.387 60.552C485.403 62.152 484.411 64.52 484.411 67.656C484.411 70.728 485.435 73.064 487.483 74.664Z" fill="white"/></svg>', t.insertAdjacentHTML("afterbegin", e), en(t, "branding")
                                    }
                                }(), se = !0), player_configs.video_offline_enabled && ((y = document.createElement("button")).setAttribute("class", "plyr__control plyr__controls__item plyr__download"), y.setAttribute("type", "button"), y.innerHTML = '\n        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V14.5858L17.2929 10.2929C17.6834 9.90237 18.3166 9.90237 18.7071 10.2929C19.0976 10.6834 19.0976 11.3166 18.7071 11.7071L12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071L5.29289 11.7071C4.90237 11.3166 4.90237 10.6834 5.29289 10.2929C5.68342 9.90237 6.31658 9.90237 6.70711 10.2929L11 14.5858V3C11 2.44772 11.4477 2 12 2ZM4 21C4 20.4477 4.44772 20 5 20H19C19.5523 20 20 20.4477 20 21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21Z" fill="var(--plyr-video-control-color, #ffffff)"/>\n        </svg>', en(y, "download-offline")), player_configs.lipsync_info && player_configs.lipsync_info.length > 0 && function() {
                                    var e, t = document.querySelector('.plyr__menu__container[id*="settings"]'),
                                        n = t.querySelector("div"),
                                        o = t.querySelector('div[id$="-home"]'),
                                        a = (null == t || null === (e = t.id) || void 0 === e ? void 0 : e.replace("-home", "")) || "plyr-settings-custom";
                                    if (o) {
                                        var r = ue.find((function(e) {
                                            return !player_configs.lipsync_info.some((function(t) {
                                                return t.srclang === e.srclang
                                            }))
                                        }));
                                        r && (player_configs.lipsync_info = player_configs.lipsync_info.map((function(e) {
                                            return "auto" !== e.srclang || e.label ? e.original && r.default ? I(I({}, e), {}, {
                                                srclang: r.srclang,
                                                label: r.label
                                            }) : e : I(I({}, e), {}, {
                                                label: r.label || "Auto"
                                            })
                                        })));
                                        var i = player_configs.lipsync_info.filter((function(e) {
                                            return e.original
                                        }))[0];
                                        i.checked = !0;
                                        var c = document.createElement("button");
                                        c.setAttribute("type", "button"), c.setAttribute("data-plyr", "settings"), c.setAttribute("aria-haspopup", "true"), c.setAttribute("role", "menuitem"), c.className = "plyr__control plyr__control--forward", c.innerHTML = "\n      <span>\n        ".concat(mt[ut].audio, ' \n        <span class="plyr__menu__value">').concat(i.label, "</span>\n      </span>\n    ");
                                        var l = o.querySelector('div[role="menu"]');
                                        l && l.insertBefore(c, l.firstChild);
                                        var s = document.createElement("div");
                                        s.id = "".concat(a, "-audio"), s.hidden = !0;
                                        var d = document.createElement("button");
                                        d.type = "button", d.className = "plyr__control plyr__control--back", d.innerHTML = '\n        <span class="plyr__sr-only">'.concat(mt[ut].back, '</span>\n        <span class="plyr__menu__label">').concat(mt[ut].audio, "</span>\n    "), d.addEventListener("click", (function() {
                                            s.hidden = !0, o.hidden = !1
                                        }));
                                        var u = document.createElement("div");
                                        u.setAttribute("role", "menu"), player_configs.lipsync_info.forEach((function(e, t) {
                                            var n = document.createElement("button");
                                            n.type = "button", n.className = "plyr__control", n.setAttribute("role", "menuitemradio"), n.setAttribute("aria-checked", e.checked ? "true" : "false"), n.setAttribute("data-plyr", "audio");
                                            var a = e.label;
                                            n.innerHTML = '\n        <span class="label">'.concat(a, "</span>\n      "), n.addEventListener("click", (function() {
                                                var t, a = Number(player.currentTime),
                                                    r = document.querySelector("video"),
                                                    i = r.getElementsByTagName("source")[0] ? r.getElementsByTagName("source")[0].src : null;
                                                if (we && !Me && !i) {
                                                    var l = "https://b-".concat(pe).concat($, "/").concat(le, "/playlist.m3u8"),
                                                        d = document.createElement("source");
                                                    d.type = "application/x-mpegURL", d.src = l, r.appendChild(d), i = r.getElementsByTagName("source")[0].src
                                                }
                                                if (i.includes(e.video_external_id) || Me || we) {
                                                    if (!i.includes(e.video_external_id)) {
                                                        r.removeAttribute("src"), r.load();
                                                        var p = "https://b-".concat(pe).concat($, "/").concat(e.video_external_id, "/playlist.m3u8");
                                                        r.getElementsByTagName("source")[0].src = p, r.load(), e.video_external_id == le && Co(), player.once("canplay", (function() {
                                                            r.currentTime = a || localStorage.getItem("panda_video:".concat(le))
                                                        })), window.postMessage({
                                                            type: "play"
                                                        }, "*"), e.checked = !0
                                                    }
                                                } else {
                                                    var m = i.replace(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i, e.video_external_id);
                                                    r.getElementsByTagName("source")[0].src = m, oo((a || window.player.currentTime, window.player.playbackRate, r.volume, r.paused)), e.checked = !0
                                                }(null === (t = window.player_configs) || void 0 === t || null === (t = t.subtitles) || void 0 === t ? void 0 : t.length) > 0 && e.video_external_id !== le && setTimeout((function() {
                                                    var e, t = B(player.media.textTracks);
                                                    try {
                                                        var n = function() {
                                                            var t = e.value,
                                                                n = "pt" == t.language ? "pt-BR" : t.language,
                                                                o = "".concat(Q, "/").concat(pe, "/").concat(le, "/").concat(n, ".vtt");
                                                            fetch(o).then((function(e) {
                                                                return e.text()
                                                            })).then((function(e) {
                                                                t.cues && 0 !== t.cues.length || Tn(e, t)
                                                            }))
                                                        };
                                                        for (t.s(); !(e = t.n()).done;) n()
                                                    } catch (e) {
                                                        t.e(e)
                                                    } finally {
                                                        t.f()
                                                    }
                                                }), 300);
                                                var f = Ro(Oo("captions"));
                                                f && (f.click(), f.click()), c.querySelector(".plyr__menu__value").textContent = e.label, u.querySelectorAll("button").forEach((function(e) {
                                                    return e.setAttribute("aria-checked", "false")
                                                })), n.setAttribute("aria-checked", "true"), s.hidden = !0, o.hidden = !1
                                            })), n.setAttribute("data-testid", "audio-".concat(e.srclang)), u.appendChild(n)
                                        })), s.appendChild(d), s.appendChild(u), n.appendChild(s), c.addEventListener("click", (function() {
                                            o.hidden = !0, s.hidden = !1
                                        }))
                                    }
                                }(), Me && function() {
                                    var e, t;
                                    (t = document.querySelectorAll('[data-plyr="settings"].plyr__control.plyr__control--forward')) && t.forEach((function(e) {
                                        var t = e.querySelector("span");
                                        t && /Qualidade|Calidad|Quality/i.test(t.innerHTML) && (e.style.display = "none")
                                    }));
                                    var n = document.querySelector('.plyr__menu__container[id*="settings"]'),
                                        o = n.querySelector("div"),
                                        a = n.querySelector('div[id$="-home"]'),
                                        r = (null == n || null === (e = n.id) || void 0 === e ? void 0 : e.replace("-home", "")) || "plyr-settings-custom";
                                    if (a) {
                                        var i = JSON.parse(localStorage.getItem("plyr")),
                                            c = Et.find((function(e) {
                                                return e.label == "".concat(i.quality, "p")
                                            })) || Et[0];
                                        c.checked = !0;
                                        var l = document.createElement("button");
                                        l.setAttribute("type", "button"), l.setAttribute("data-plyr", "settings"), l.setAttribute("aria-haspopup", "true"), l.setAttribute("role", "menuitem"), l.className = "plyr__control plyr__control--forward", l.innerHTML = "\n      <span>\n        ".concat(mt[ut].quality, ' \n        <span class="plyr__menu__value">').concat(c.label, "</span>\n      </span>\n    ");
                                        var s = a.querySelector('div[role="menu"]');
                                        s.children.length >= 3 ? s.insertBefore(l, s.children[2]) : s.appendChild(l);
                                        var d = document.createElement("div");
                                        d.id = "".concat(r, "-quality"), d.hidden = !0;
                                        var u = document.createElement("button");
                                        u.type = "button", u.className = "plyr__control plyr__control--back", u.innerHTML = '\n        <span class="plyr__sr-only">'.concat(mt[ut].back, '</span>\n        <span class="plyr__menu__label">').concat(mt[ut].quality, "</span>\n    "), u.addEventListener("click", (function() {
                                            d.hidden = !0, a.hidden = !1
                                        }));
                                        var p = document.createElement("div");
                                        p.setAttribute("role", "menu"), Et.forEach((function(e, t) {
                                            var n = document.createElement("button");
                                            n.type = "button", n.className = "plyr__control", n.setAttribute("role", "menuitemradio"), n.setAttribute("aria-checked", e.checked ? "true" : "false"), n.setAttribute("data-plyr", "quality");
                                            var o = e.label;
                                            n.innerHTML = '\n        <span class="label">'.concat(o, "</span>\n      "), n.addEventListener("click", (function() {
                                                localStorage.setItem("plyr", JSON.stringify(I(I({}, i), {}, {
                                                    quality: parseInt(e.label.replace("p", ""), 10)
                                                })));
                                                var t = document.querySelector("video"),
                                                    o = t.getElementsByTagName("source")[0].src,
                                                    r = Number(window.player.currentTime);
                                                if (!o.includes(e.label)) {
                                                    var c;
                                                    t.removeAttribute("src"), t.load();
                                                    var s = le,
                                                        u = o.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
                                                    u && (s = u[0]);
                                                    var m = "https://b-".concat(pe).concat($, "/").concat(s, "/").concat(e.label, "/video.m3u8");
                                                    Oe && (m += "?watermark=" + Oe), t.getElementsByTagName("source")[0].src = m, t.load(), t.onloadedmetadata = function() {
                                                        t.currentTime = localStorage.getItem("panda_video:".concat(le)) || r || window.player.currentTime || 0, t.playbackRate = window.player.playbackRate || 1, t.volume = t.volume, t.paused || t.play()
                                                    }, (null === (c = window.player_configs) || void 0 === c || null === (c = c.subtitles) || void 0 === c ? void 0 : c.length) > 0 && setTimeout((function() {
                                                        var e, t = player.media,
                                                            n = Array.from(t.textTracks).map((function(e) {
                                                                return e.language
                                                            })),
                                                            o = B(window.player_configs.subtitles);
                                                        try {
                                                            var a = function() {
                                                                var o = e.value,
                                                                    a = "pt" === o.srclang ? "pt-BR" : o.srclang;
                                                                if (!n.includes(a)) {
                                                                    var r = "".concat(Q, "/").concat(pe, "/").concat(le, "/").concat(a, ".vtt"),
                                                                        i = document.createElement("track");
                                                                    i.kind = "subtitles", i.label = o.label || a, i.srclang = "pt-BR" == a ? "pt" : o.srclang, i.src = r, i.default = !1, t.appendChild(i), i.addEventListener("load", (function() {
                                                                        var e = Array.from(t.textTracks).find((function(e) {
                                                                            return e.language === a
                                                                        }));
                                                                        !e || e.cues && 0 !== e.cues.length || fetch(r).then((function(e) {
                                                                            return e.text()
                                                                        })).then((function(t) {
                                                                            return Tn(t, e)
                                                                        })).then((function() {
                                                                            var e = Ro(Oo("captions"));
                                                                            e.click(), e.click()
                                                                        }))
                                                                    }))
                                                                }
                                                            };
                                                            for (o.s(); !(e = o.n()).done;) a()
                                                        } catch (e) {
                                                            o.e(e)
                                                        } finally {
                                                            o.f()
                                                        }
                                                    }))
                                                }
                                                window.player.currentTime = localStorage.getItem("panda_video:".concat(le)) || r, player.currentTime = localStorage.getItem("panda_video:".concat(le)) || r, window.postMessage({
                                                    type: "currentTime",
                                                    parameter: localStorage.getItem("panda_video:".concat(le) || 0)
                                                }, "*"), window.postMessage({
                                                    type: "play"
                                                }, "*"), e.checked = !0, l.querySelector(".plyr__menu__value").textContent = e.label, p.querySelectorAll("button").forEach((function(e) {
                                                    return e.setAttribute("aria-checked", "false")
                                                })), n.setAttribute("aria-checked", "true"), d.hidden = !0, a.hidden = !1
                                            })), p.appendChild(n)
                                        })), d.appendChild(u), d.appendChild(p), o.appendChild(d), l.addEventListener("click", (function() {
                                            a.hidden = !0, d.hidden = !1
                                        }))
                                    }
                                }(), $e && (player_configs.defaultSpeed = null == et ? void 0 : et.defaultSpeed), $e && we && To(document.getElementsByClassName("plyr__controls")[0], "disabled"), (f = document.querySelector('.plyr__menu__container[id*="settings"] > div')) && (f.style.maxHeight = "calc(-50px + 75vh)", f.style.minHeight = "100px", f.style.overflowY = "auto"), "online" === Je && (p = document.getElementsByClassName("plyr__controls")[0], (m = document.createElement("button")).setAttribute("id", "live-time-indicator"), m.onclick = function() {
                                    window.postMessage({
                                        type: "currentTime",
                                        parameter: -1
                                    }, "*")
                                }, m.innerHTML = "<div></div> LIVE", p.insertBefore(m, p.childNodes[1]));
                            try {
                                ! function() {
                                    t.apply(this, arguments)
                                }()
                            } catch (e) {}! function() {
                                var e = window.player.elements.controls;
                                Ao();
                                var t = qo();
                                t.custom_controls_menu_required && function(e, t) {
                                    var n = player_configs.controlsColor || "#ffffff";
                                    tt.style.setProperty("--plyr-custom-controls-menu-icon-color", n), tt.style.setProperty("--plyr-custom-controls-menu-content-color", "#4a5464"), tt.style.setProperty("--plyr-custom-controls-menu-content-hover-color", "#4a5464");
                                    var o = j.getSvgItem("custom_controls_menu_icon"),
                                        a = '\n        <div class="plyr__controls__item plyr__custom-controls-menu">\n            <button id="custom-controls-menu" aria-haspopup="true" aria-expanded="false" type="button" class="plyr__control" data-plyr="custom-controls-menu" aria-pressed="false">\n                '.concat(o, '\n                <span class="plyr__sr-only">Custom controls menu</span>\n            </button>\n        </div>\n    '),
                                        r = document.createElement("div");
                                    r.className = "plyr__custom-controls-menu-content", r.setAttribute("role", "menu");
                                    var i = e,
                                        c = "beforeend";
                                    t && (i = Ro(".panda-branding-link"), c = "beforebegin"), i.insertAdjacentHTML(c, a);
                                    var l, s, d, u, p = Ro(".plyr__custom-controls-menu button");
                                    p.parentNode.insertAdjacentElement("beforeend", r),
                                        function(e, t) {
                                            var n = function(n) {
                                                    Nn("custom-controls-menu"), e.setAttribute("aria-expanded", "true"), t.classList.add("open"), "on-btn-click" === n && (t.classList.add(n), t.classList.remove("on-btn-hover")), "on-btn-hover" === n && t.classList.add(n)
                                                },
                                                o = function(n) {
                                                    if ("on-btn-click" === n && t.classList.contains("on-btn-hover")) return t.classList.remove("on-btn-hover"), void t.classList.add("on-btn-click");
                                                    "on-btn-leave" === n && (t.classList.remove("on-btn-hover"), t.classList.contains("on-btn-click")) || (e.setAttribute("aria-expanded", "false"), t.classList.remove("open"), "on-btn-click" !== n && "on-menu-leave" !== n || t.classList.remove("on-btn-click"))
                                                };
                                            e.addEventListener("click", (function(t) {
                                                t.stopPropagation(), "true" === e.getAttribute("aria-expanded") ? o("on-btn-click") : n("on-btn-click")
                                            })), e.addEventListener("mouseenter", (function() {
                                                return !t.classList.contains("open") && n("on-btn-hover")
                                            })), e.addEventListener("mouseleave", (function() {
                                                return t.classList.contains("on-btn-hover") && o("on-btn-leave")
                                            })), t.addEventListener("mouseleave", (function() {
                                                return o("on-menu-leave")
                                            })), t.addEventListener("mouseenter", (function() {
                                                return n()
                                            }))
                                        }(p, r), l = tt.style.getPropertyValue("--plyr-custom-controls-menu-content-color"), s = tt.style.getPropertyValue("--plyr-color-main"), u = (.2126 * (d = function(e) {
                                            3 === (e = e.replace("#", "")).length && (e = e.split("").map((function(e) {
                                                return e + e
                                            })).join(""));
                                            var t = parseInt(e, 16);
                                            return {
                                                r: t >> 16 & 255,
                                                g: t >> 8 & 255,
                                                b: 255 & t
                                            }
                                        }(s)).r + .7152 * d.g + .0722 * d.b) / 255 < .55 ? "#ffffff" : l, tt.style.setProperty("--plyr-custom-controls-menu-content-hover-color", u), St = !0, Ao();
                                    var m = Ro('[data-plyr="settings"]');
                                    m && m.addEventListener("click", (function() {
                                        Nn("settings")
                                    }))
                                }(e, t.has_panda_branding), At = At.filter((function(e, t, n) {
                                    return t === n.findIndex((function(t) {
                                        return t.control_name === e.control_name
                                    }))
                                }));
                                var n = t.secondary_enabled_controls,
                                    o = ["captions", "ai-assistant-chat", "panda-ai", "live-chat", "settings", "fullscreen"],
                                    a = n.filter((function(e) {
                                        return o.includes(e)
                                    }));
                                Pt = a.length, Po(At, Lt, !0).forEach((function(t) {
                                    Bo(t, e), a.includes(t.control_name) || Pt++
                                }))
                            }(), ot = !0, window.liveAttempts = 0
                        }
                        var c, l, s, u, p, m, f, y, h, v, g, b, w, _
                    }, he ? fn() : pn(), document.getElementsByTagName("head")[0], document.createElement("script").type = "text/javascript"
                }

                function Gn() {
                    player_configs.timeDisplayType && "current" != player_configs.timeDisplayType || (player_configs.timeDisplayType = "CURRENT_TOTAL_TIME");
                    for (var e = 0, t = Object.keys(player_configs); e < t.length; e++) {
                        var n = t[e],
                            o = Z.searchParams.get(n);
                        if (o) {
                            if ("trialWarning" === n) continue;
                            if ("initQuality" === n && (player_configs[n] = parseInt(o, 10)), "timeDisplayType" === n) {
                                var a = player_configs.controls.findIndex((function(e) {
                                        return "current-time" === e
                                    })),
                                    r = player_configs.controls.findIndex((function(e) {
                                        return "duration" === e
                                    })); - 1 !== a && "CURRENT_TOTAL_TIME" == o && player_configs.controls.splice(a + 1, 0, "duration"), ["REMAINING_TIME", "CURRENT_TIME", "HIDE_TIME"].includes(o) && -1 !== r && player_configs.controls.splice(r, 1)
                            }
                            if ("controls" === n) {
                                player_configs[n] = o.split(",");
                                var i = player_configs.controls.findIndex((function(e) {
                                    return "volume" === e
                                })); - 1 !== i && player_configs.controls.splice(i, 0, "mute");
                                var c = player_configs.controls.findIndex((function(e) {
                                    return "current-time" === e
                                })); - 1 !== c && player_configs.controls.splice(c + 1, 0, "duration")
                            } else "boolean" == typeof player_configs[n] ? "true" !== o && "false" !== o || (player_configs[n] = "true" === o) : "number" == typeof player_configs[n] ? player_configs[n] = parseFloat(o) : Array.isArray(player_configs[n]) ? player_configs[n] = o.split(",") : player_configs[n] = o
                        }
                    }
                }
                $t(), ((le || fe || ye || me) && pe || (document.write("Missing videoID (v) or libID (l)"), 0)) && Zn();
                var Qn = function() {
                        var e = Me ? "ios" : "hlsjs",
                            t = document.querySelector("video");
                        if ("hlsjs" === e) return window.hls.audioTracks;
                        if ("ios" === e) {
                            for (var n = [], o = 0; o < t.audioTracks.length; o++) n.push({
                                name: t.audioTracks[o].label,
                                id: t.audioTracks[o].id,
                                lang: t.audioTracks[o].language
                            });
                            return n
                        }
                    },
                    Kn = function() {
                        var e = Me ? "ios" : "hlsjs",
                            t = document.querySelector("video");
                        if ("hlsjs" === e) return -1 === window.hls.audioTrack ? window.hls.audioTracks[0] : window.hls.audioTracks[window.hls.audioTrack];
                        if ("ios" === e)
                            for (var n = 0; n < t.audioTracks.length; n++)
                                if (t.audioTracks[n].enabled) return {
                                    name: t.audioTracks[n].label,
                                    id: t.audioTracks[n].id,
                                    lang: t.audioTracks[n].language
                                }
                    },
                    Jn = function(e) {
                        var t = Me ? "ios" : "hlsjs",
                            n = document.querySelector("video");
                        if ("hlsjs" === t) window.hls.audioTrack = e;
                        else if ("ios" === t)
                            for (var o = 0; o < n.audioTracks.length; o++) n.audioTracks[o].id === e ? n.audioTracks[o].enabled = !0 : n.audioTracks[o].enabled = !1;
                        window.player && !Me && (window.isPlaying = window.player.playing, window.player.pause(), to(!0));
                        try {
                            localStorage.setItem("panda_video_audio_lang", Kn().lang)
                        } catch (e) {}! function() {
                            var e = document.querySelector("#panda-settings-audio-btn");
                            if (e) {
                                var t = Kn();
                                e.innerHTML = '<span>Áudio<span class="plyr__menu__value">'.concat(t.name, "</span></span>");
                                var n = document.querySelector("#plyr-settings-audio");
                                if (n) {
                                    var o, a = B(n.querySelectorAll('button[data-plyr="language"]'));
                                    try {
                                        for (a.s(); !(o = a.n()).done;) {
                                            var r = o.value;
                                            r.value == t.id ? r.setAttribute("aria-checked", !0) : r.setAttribute("aria-checked", !1)
                                        }
                                    } catch (e) {
                                        a.e(e)
                                    } finally {
                                        a.f()
                                    }
                                }
                            }
                        }()
                    };

                function Yn(e) {
                    var t, n;
                    return n = e, t = new Intl.DisplayNames([e], {
                        type: "language"
                    }).of(n), String(t).charAt(0).toUpperCase() + String(t).slice(1)
                }

                function Xn() {
                    setTimeout((function() {
                        var e = player.elements.settings.panels.captions;
                        if (e) {
                            var t = e.querySelector('div[role="menu"]');
                            if (t) {
                                t.querySelectorAll("button").forEach((function(e) {
                                    var t = e.querySelector(".plyr__badge");
                                    if (t) {
                                        var n = t.innerText,
                                            o = e.querySelector(":scope > span"),
                                            a = Array.from(o.childNodes).find((function(e) {
                                                return e.nodeType === Node.TEXT_NODE
                                            }));
                                        a && (a.nodeValue = Yn(n))
                                    }
                                }));
                                var n = t.querySelector('button[aria-checked="true"');
                                if (n) {
                                    var o = n.querySelector(":scope > span"),
                                        a = Array.from(o.childNodes).find((function(e) {
                                            return e.nodeType === Node.TEXT_NODE
                                        }));
                                    document.querySelector('.plyr__menu__container[id*="settings"] div div[id*="home"] div[role="menu"]').querySelectorAll("button").forEach((function(e) {
                                        var t = e.querySelector(":scope > span");
                                        t && /Legendas|Subtítulos|Subtitles/i.test(t.innerHTML) && (t.querySelector(".plyr__menu__value").innerText = a.nodeValue)
                                    }))
                                }
                            }
                        }
                    }), 100)
                }

                function $n() {
                    var e = document.querySelector('.plyr__menu__container[id*="settings"] > div > div > div');
                    if (e && !player_configs.lipsync_info && !window.player_configs.lipsync_info && !(Qn().length < 2)) {
                        var t = Kn(),
                            n = document.createElement("button");
                        n.setAttribute("data-plyr", "settings"), n.setAttribute("type", "button"), n.setAttribute("class", "plyr__control plyr__control--forward"), n.setAttribute("role", "menuitem"), n.setAttribute("id", "panda-settings-audio-btn"), n.setAttribute("aria-haspopup", "true"), n.innerHTML = '<span>Áudio<span class="plyr__menu__value">'.concat(t.name, "</span></span>"), n.onclick = function() {
                            var e, t = B(document.querySelector('.plyr__menu__container[id*="settings"] > div').childNodes);
                            try {
                                for (t.s(); !(e = t.n()).done;) {
                                    var n = e.value;
                                    n.id.includes("audio") ? n.removeAttribute("hidden") : n.setAttribute("hidden", "")
                                }
                            } catch (e) {
                                t.e(e)
                            } finally {
                                t.f()
                            }
                        }, e.insertBefore(n, e.childNodes[0]);
                        var o = document.querySelector('.plyr__menu__container[id*="settings"] > div'),
                            a = document.createElement("div");
                        a.setAttribute("id", "plyr-settings-audio"), a.setAttribute("hidden", "");
                        var r = document.createElement("button");
                        r.setAttribute("type", "button"), r.setAttribute("class", "plyr__control plyr__control--back"), r.innerHTML = '<span aria-hidden="true">Áudio</span><span class="plyr__sr-only">Voltar ao menu anterior</span>', r.onclick = function() {
                            var e, t = B(document.querySelector('.plyr__menu__container[id*="settings"] > div ').childNodes);
                            try {
                                for (t.s(); !(e = t.n()).done;) {
                                    var n = e.value;
                                    n.id.includes("home") ? n.removeAttribute("hidden") : n.setAttribute("hidden", "")
                                }
                            } catch (e) {
                                t.e(e)
                            } finally {
                                t.f()
                            }
                        };
                        var i = document.createElement("div");
                        i.setAttribute("role", "menu");
                        var c, l = B(Qn());
                        try {
                            var s = function() {
                                var e = c.value,
                                    n = document.createElement("button");
                                n.setAttribute("data-plyr", "language"), n.setAttribute("data-testid", "audio-".concat(e.lang)), n.setAttribute("type", "button"), n.setAttribute("role", "menuitemradio"), n.setAttribute("class", "plyr__control"), n.setAttribute("aria-checked", t.id === e.id), n.setAttribute("value", e.id), n.innerHTML = "<span>".concat(e.name).concat("default" !== e.lang ? '<span class="plyr__menu__value"><span class="plyr__badge">'.concat(e.lang.toUpperCase(), "</span></span>") : "", "</span>"), n.onclick = function() {
                                    Jn(e.id), r.click(), document.querySelector(".plyr__controls__item.plyr__menu button[data-plyr='settings']").click()
                                }, i.appendChild(n)
                            };
                            for (l.s(); !(c = l.n()).done;) s()
                        } catch (e) {
                            l.e(e)
                        } finally {
                            l.f()
                        }
                        a.appendChild(r), a.appendChild(i), o.appendChild(a)
                    }
                }

                function eo(e) {
                    try {
                        if (0 === e) window.hls.currentLevel = -1;
                        else {
                            if ("online" === Je) {
                                var t = Xe.reverse().indexOf(e);
                                t >= 0 && (window.hls.currentLevel = t)
                            }
                            window.hls.levels.forEach((function(t, n) {
                                t.height === e && (window.hls.currentLevel = n)
                            }))
                        }
                    } catch (e) {}
                }

                function to(e) {
                    var t = document.getElementsByClassName("loading-icon")[0],
                        n = document.querySelector(".plyr__control--overlaid");
                    e ? (n && To(n, "disabled"), So(t, "disabled")) : (n && So(n, "disabled"), To(t, "disabled"))
                }

                function no(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        recoverFromError: !1
                    };
                    t.recoverFromError && window.hls && window.hls.destroy();
                    var n = new y.ZP(e),
                        o = document.querySelector("video");
                    o.addEventListener("waiting", (function() {
                        to(!0)
                    })), o.addEventListener("playing", (function() {
                        to(!1)
                    }));
                    var a = o.getElementsByTagName("source")[0].src;
                    if (a.includes("token=")) {
                        var r = a.split("token=")[1].split("&")[0];
                        a = a.replace(r, co())
                    }
                    o.getElementsByTagName("source")[0].src = a, n.loadSource(a), n.attachMedia(o), he && n.on(y.ZP.Events.LEVEL_UPDATED, (function(e, t) {
                        "online" === Je && !1 === t.details.live && (console.log("The live stream has ended!"), Ke = !0)
                    })), n.on(y.ZP.Events.AUDIO_TRACKS_UPDATED, (function(e, t) {
                        t.audioTracks.forEach((function(e) {
                            e.name = Yn(e.lang || e.language || "")
                        }));
                        try {
                            $n()
                        } catch (e) {
                            console.log("Error adding audio controls", e)
                        }
                    })), player.on("captionsenabled", (function() {
                        return Xn()
                    })), player.on("captionsdisabled", (function() {
                        return Xn()
                    })), n.on(y.ZP.Events.SUBTITLE_TRACKS_UPDATED, (function(e, t) {
                        t.subtitleTracks && t.subtitleTracks.length && (Xn(), player_configs.defaultSubtitle && (window.player.language = player_configs.defaultSubtitle), player_configs.startsWithSubtitle && (window.player.captions.active = !0))
                    })), n.on(y.ZP.Events.SUBTITLE_TRACK_SWITCH, (function() {
                        Xn()
                    })), n.on(y.ZP.Events.MANIFEST_PARSED, (function() {
                        try {
                            eo(JSON.parse(localStorage.getItem("plyr")).quality)
                        } catch (e) {}
                        t.recoverFromError ? (t.isPlaying && o.play(), o.currentTime = t.currentTime, o.speed = t.speed, o.volume = t.volume) : Te || player_configs.autoplay && (player_configs.smartAutoplay ? (o.volume = 1, o.play()) : (o.volume = 0, o.play()))
                    })), n.on(y.ZP.Events.BUFFER_APPENDED, (function(e, t) {
                        He || to(!1), "audio" === t.type && window.isPlaying && window.player.play()
                    })), n.on(y.ZP.Events.LEVEL_SWITCHED, (function(e, t) {
                        var o = document.querySelector(".plyr__controls [data-plyr='quality'][value='0'] span");
                        if (null != o)
                            if (n.autoLevelEnabled) {
                                var a = n.levels[t.level].height;
                                o.innerHTML = "Auto (" + a + "p)"
                            } else o.innerHTML = "Auto";
                        var r, i = B(document.querySelectorAll(".plyr__controls [role='menuitem'] span.plyr__menu__value"));
                        try {
                            for (i.s(); !(r = i.n()).done;) {
                                var c = r.value;
                                if (c.innerHTML.includes("Auto") || "0p" === c.innerHTML)
                                    if (n.autoLevelEnabled) {
                                        var l = n.levels[t.level].height;
                                        c.innerHTML = "Auto (" + l + "p)"
                                    } else c.innerHTML = "Auto"
                            }
                        } catch (e) {
                            i.e(e)
                        } finally {
                            i.f()
                        }
                    }));
                    var i = function() {
                            try {
                                var e = n.streamController.levels.map((function(e) {
                                        return e.height
                                    })),
                                    t = n.streamController.levels[n.streamController.level].height,
                                    o = e.sort((function(e, t) {
                                        return t - e
                                    })).find((function(e) {
                                        return e !== t
                                    }));
                                eo(o), console.log("Changing video quality to the next higher one", o), window.player.quality = o
                            } catch (e) {}
                        },
                        c = function() {
                            try {
                                return l()
                            } catch (e) {
                                return console.error("Error in backQuality:", e), !1
                            }
                        },
                        l = function() {
                            try {
                                var e = n.streamController.levels.map((function(e) {
                                        return e.height
                                    })),
                                    t = n.streamController.levels[n.streamController.level].height;
                                if (t <= 480) return !1;
                                var o = e.sort((function(e, t) {
                                    return t - e
                                })).find((function(e) {
                                    return e < t
                                }));
                                return !!o && (console.log("Changing video quality to a lower one", o), eo(o), window.player.quality = o, !0)
                            } catch (e) {
                                return console.error("Error in performQualityDowngrade:", e), !1
                            }
                        },
                        s = 0;
                    n.on(y.ZP.Events.LEVEL_SWITCHING, (function(e, t) {
                        var o, a = B(n.levels);
                        try {
                            for (a.s(); !(o = a.n()).done;) {
                                var r = o.value;
                                if (r && r.uri && r.uri.includes("token=")) {
                                    var i = r.uri.split("token=")[1].split("&")[0],
                                        c = co();
                                    r.url = [r.uri.replace(i, c)]
                                }
                            }
                        } catch (e) {
                            a.e(e)
                        } finally {
                            a.f()
                        }
                    })), n.on(y.ZP.Events.ERROR, (function(t, r) {
                        if ("hlsFragParsingMetadata" !== "".concat(r.event) || "internalException" !== "".concat(r.details))
                            if (kt++, "bufferStalledError" === "".concat(r.details) && to(!0), he && "levelLoadTimeout" === "".concat(r.details)) console.log("=> PANDA HLS ERROR DELECTED\nPRELOAD=" + Te + "\n", t, r), no(e, {
                                recoverFromError: !0,
                                currentTime: window.player.currentTime,
                                speed: window.player.currentTime,
                                volume: o.volume,
                                isPlaying: !o.paused
                            });
                            else if (r.response && 404 === r.response.code) he ? setTimeout((function() {
                            console.log("=> PANDA HLS ERROR DELECTED\nPRELOAD=" + Te + "\n", t, r), no(e, {
                                recoverFromError: !0,
                                currentTime: window.player.currentTime,
                                speed: window.player.currentTime,
                                volume: o.volume,
                                isPlaying: !o.paused
                            })
                        }), 1e4) : re || i();
                        else if (r.response && 403 === r.response.code && s < 3) {
                            if (3 == ++s) i(), s = 0;
                            else if (ce && a.includes("token=")) {
                                var l = a.split("token=")[1].split("&")[0],
                                    d = a.replace(l, co());
                                o.getElementsByTagName("source")[0].src = d
                            }
                        } else if (r.fatal) setTimeout((function() {
                            if (ce && a.includes("token=")) {
                                var n = a.split("token=")[1].split("&")[0],
                                    i = a.replace(n, co());
                                o.getElementsByTagName("source")[0].src = i
                            }
                            console.log("=> PANDA HLS ERROR DELECTED\nPRELOAD=" + Te + "\n", t, r), no(I(I({}, e), {}, {
                                maxBufferLength: 10,
                                maxBufferSize: 5e7,
                                detectStallWithCurrentTimeMs: 1250,
                                nudgeOnVideoHole: !0
                            }), {
                                recoverFromError: !0,
                                currentTime: window.player.currentTime,
                                speed: window.player.currentTime,
                                volume: o.volume,
                                isPlaying: !o.paused
                            })
                        }), 3e4);
                        else if ("online" !== Je)
                            if (!re && function(e) {
                                    try {
                                        var t, n = e.abrController.fragCurrent.url,
                                            o = ne.find((function(e) {
                                                return n.includes(e)
                                            })),
                                            a = B(e.streamController.levels);
                                        try {
                                            for (a.s(); !(t = a.n()).done;) {
                                                var r = t.value;
                                                if (r.details && r.details.fragments) {
                                                    var i, c = B(r.details.fragments);
                                                    try {
                                                        for (c.s(); !(i = c.n()).done;)
                                                            if (!i.value.url.includes(o)) return !0
                                                    } catch (e) {
                                                        c.e(e)
                                                    } finally {
                                                        c.f()
                                                    }
                                                }
                                            }
                                        } catch (e) {
                                            a.e(e)
                                        } finally {
                                            a.f()
                                        }
                                    } catch (e) {}
                                    return !1
                                }(n) && oe.includes("".concat(r.details))) ! function(e) {
                                var t = e.abrController.fragCurrent.url;
                                ae = ne.find((function(e) {
                                    return !t.includes(e)
                                }));
                                var n, o = B(e.streamController.levels);
                                try {
                                    for (o.s(); !(n = o.n()).done;) {
                                        var a = n.value;
                                        if (a.details && a.details.fragments) {
                                            var r, i = B(a.details.fragments);
                                            try {
                                                var c = function() {
                                                    var e = r.value,
                                                        t = e.url,
                                                        n = ne.find((function(e) {
                                                            return t.includes(e)
                                                        })),
                                                        o = t.replace(n, ae);
                                                    e.url = o
                                                };
                                                for (i.s(); !(r = i.n()).done;) c()
                                            } catch (e) {
                                                i.e(e)
                                            } finally {
                                                i.f()
                                            }
                                        }
                                    }
                                } catch (e) {
                                    o.e(e)
                                } finally {
                                    o.f()
                                }
                                console.log("Recovering to", ne.findIndex((function(e) {
                                    return e === ae
                                })))
                            }(n);
                            else {
                                if ([y.ZP.ErrorDetails.BUFFER_APPEND_ERROR, y.ZP.ErrorDetails.BUFFER_STALLED_ERROR, y.ZP.ErrorDetails.BUFFER_NUDGE_ON_STALL, y.ZP.ErrorDetails.BUFFER_FULL_ERROR].includes(r.details)) return void c();
                                if ([y.ZP.ErrorDetails.FRAG_LOAD_ERROR, y.ZP.ErrorDetails.FRAG_LOAD_TIMEOUT].includes(r.details)) c();
                                else if (r.reason && !r.reason.includes("AAC PES did not start with ADTS header"))
                                    if (console.log("=> PANDA HLS ERROR DELECTED\nPRELOAD=" + Te + "\n", t, r), !Ie || re) no(e, {
                                        recoverFromError: !0,
                                        currentTime: window.player.currentTime,
                                        speed: window.player.currentTime,
                                        volume: window.player.volume,
                                        isPlaying: !o.paused
                                    });
                                    else {
                                        Number(window.player.currentTime), o.removeAttribute("src"), o.load();
                                        var u = le,
                                            p = "https://b-".concat(pe).concat($, "/").concat(u, "/playlist.m3u8");
                                        o.getElementsByTagName("source")[0].src = p, o.load(), window.postMessage({
                                            type: "play"
                                        }, "*")
                                    }
                            }
                    })), window.hls = n, -1 == window.hls.currentLevel && "online" !== Je && "finished" !== Je && "NOT_LIVE" !== Je && (window.hls.currentLevel = 2)
                }

                function oo() {
                    if (Be) {
                        var e = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                            t = navigator.deviceMemory && navigator.deviceMemory <= 4,
                            n = navigator.deviceMemory && navigator.deviceMemory <= 2,
                            o = navigator.connection && "slow-2g" === navigator.connection.effectiveType,
                            a = 20,
                            r = 6e7;
                        n || t ? (a = 5, r = 15e6) : (e || o) && (a = 10, r = 3e7), no({
                            abrEwmaDefaultEstimate: 5e6,
                            maxBufferLength: a,
                            maxBufferSize: r,
                            autoStartLoad: !0,
                            manifestLoadingRetryDelay: 3e4,
                            fragLoadingMaxRetry: 9999,
                            fragLoadingTimeOut: 1e3 * xt,
                            detectStallWithCurrentTimeMs: 1250,
                            nudgeOnVideoHole: !0,
                            maxBufferHole: n ? 1 : .5,
                            xhrSetup: function(e, t) {}
                        })
                    }
                    ve = !0
                }

                function ao() {
                    return ro.apply(this, arguments)
                }

                function ro() {
                    return (ro = q(P().mark((function e() {
                        var t, n, o, a, r;
                        return P().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (e.prev = 0, t = "https://hit-realtime.pandavideo.com/icon.gif", n = !!window.hls.levels[window.hls.currentLevel] && window.hls.levels[window.hls.currentLevel].height) {
                                        e.next = 5;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 5:
                                    o = window.player.currentTime, a = window.hls.bandwidthEstimate / 1e3, r = "".concat(t, "?quality=").concat(n, "&time=").concat(o.toFixed(2), "&bandwidth=").concat(a.toFixed(2), "&v=").concat(le, "&u=").concat(Ht, "&p=").concat(pe, "&referrer=").concat(encodeURIComponent(Ot), "&visibily=").concat(!document[H], "&errors=").concat(kt).concat(z()), kt = 0, fetch(r), e.next = 15;
                                    break;
                                case 12:
                                    e.prev = 12, e.t0 = e.catch(0), console.log("Error sending live beacon", e.t0);
                                case 15:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [0, 12]
                        ])
                    })))).apply(this, arguments)
                }

                function io(e) {
                    var t = new Image;
                    t.src = e, t.onload = function() {
                        try {
                            var e = "cover";
                            t.width < t.height && (e = "contain"), Ho(), tt.style.setProperty("--background-size", e)
                        } catch (e) {
                            tt.style.setProperty("--background-size", "cover")
                        }
                    }, t.onerror = function() {
                        Ho(), tt.style.setProperty("--background-size", "cover")
                    }
                }

                function co() {
                    for (var e = "", t = 0; t < 64; t++) {
                        var n = Math.floor(62 * Math.random());
                        e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n)
                    }
                    return e
                }

                function lo() {
                    return lo = q(P().mark((function e(t) {
                        var n, o, a, r, i, c, l, s, d, u, p, m, f;
                        return P().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = 0, o = [], a = !1, r = !1, e.prev = 4, i = -1 === t.indexOf("?") ? "?" : "&", t += "".concat(i, "get_qualities=1"), c = {
                                        method: "GET"
                                    }, he || (c.headers = {
                                        "X-Custom-Referer": Ot
                                    }), e.next = 11, fetch("".concat(t), c);
                                case 11:
                                    if (401 !== (l = e.sent).status) {
                                        e.next = 19;
                                        break
                                    }
                                    return s = l.headers.get("drm-group-id"), Re && (s = Re), Bn(s), e.abrupt("return", !1);
                                case 19:
                                    if (403 !== l.status) {
                                        e.next = 22;
                                        break
                                    }
                                    return le = "48af5a59-3ac4-480e-abff-905690d94567", pe = "vz-ded14ebd-85a", document.querySelector("video > source").src = "https://b-".concat(pe).concat($, "/").concat(le, "/playlist.m3u8"), window.pandatag("videoHtmlLoaded", !0), On(), e.abrupt("return", !1);
                                case 22:
                                    return e.next = 24, l.text();
                                case 24:
                                    d = e.sent, ue = d.split("\n").filter((function(e) {
                                        return e.startsWith("#EXT-X-MEDIA:TYPE=AUDIO")
                                    })).map((function(e) {
                                        var t = e.match(/LANGUAGE="([^"]+)"/),
                                            n = e.match(/NAME="([^"]+)"/),
                                            o = e.match(/DEFAULT="?([^",]+)"?/);
                                        return {
                                            srclang: t ? t[1] : "",
                                            label: n ? n[1] : "",
                                            default: o && "YES" === o[1].toUpperCase()
                                        }
                                    })), u = d.split("\n");
                                    try {
                                        p = u.filter((function(e) {
                                            return e.startsWith("#EXTINF")
                                        })).map((function(e) {
                                            return e.split(",")[1]
                                        })), m = p[0].split("|").reduce((function(e, t) {
                                            var n = t.indexOf(":");
                                            if (-1 === n) return e;
                                            var o = t.substring(0, n),
                                                a = t.substring(n + 1);
                                            return e[o] = a, e
                                        }), {}), m.drm && (a = "true" === m.drm, re = a, Ve = m.security_type, Ue = m.is_group_active, "regular" === Ve && Ue && (Fe = [m.string1, m.string2, m.string3], je = {
                                            fontFamily: m["font-family"],
                                            fontColor: m["font-color"],
                                            fontSize: m["font-size"]
                                        }, ze = {
                                            color: m["box-color"],
                                            opacity: m["box-opacity"]
                                        }, We = m["animation-type"])), m.block_download && (r = "true" === m.block_download), m.duration && (n = parseInt(m.duration)), m.percent_ts && 100 * parseFloat(m.percent_ts) == 0 && (re = !1, He = !1), re && (He = !0)
                                    } catch (e) {}
                                    f = "", u.forEach((function(e) {
                                        var n = e.match(/#EXT-X-STREAM-INF:.*RESOLUTION=\d+x(\d+)/);
                                        n && n[1] ? o.push(parseInt(n[1], 10)) : e.endsWith(".m3u8") && !f && (f = e.startsWith("http") ? e : t.split("/").slice(0, -1).join("/") + "/" + e)
                                    })), e.next = 35;
                                    break;
                                case 32:
                                    e.prev = 32, e.t0 = e.catch(4), console.error("Error getting m3u8:", e.t0);
                                case 35:
                                    return e.abrupt("return", {
                                        block_download: r,
                                        drm: a,
                                        duration: n,
                                        m3u8Qualities: o
                                    });
                                case 36:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [4, 32]
                        ])
                    }))), lo.apply(this, arguments)
                }
                var so = function(e, t) {
                        return function(n, o) {
                            var a = null,
                                r = "";
                            return function(o) {
                                if (null === a) {
                                    a = o;
                                    var i = window.getComputedStyle(n);
                                    r = "none" !== i.transform ? i.transform : "", n.style.transform && "none" !== n.style.transform && (r = n.style.transform)
                                }
                                var c = (o - a) / 1e3,
                                    l = Math.min(c / .5, 1),
                                    s = 1 - Math.pow(1 - l, 3),
                                    d = e * (1 - s),
                                    u = t * (1 - s),
                                    p = "translate(".concat(d.toFixed(2), "px, ").concat(u.toFixed(2), "px)");
                                return r && "none" !== r && (p = "".concat(r, " translate(").concat(d.toFixed(2), "px, ").concat(u.toFixed(2), "px)")), n.style.transform = p, 1 === l && (n.style.transform = r || "none"), c
                            }
                        }
                    },
                    uo = [so(-75, 0), so(0, -75), so(75, 0), so(75, 75), so(-75, -75)],
                    po = function(e, t) {
                        return function(n, o) {
                            var a = null,
                                r = "";
                            return function(o) {
                                null === a && (a = o, n.style.transform && "none" !== n.style.transform && (r = n.style.transform), Object.assign(n.style, e), n.style.transition = "none", n.offsetHeight, n.style.transition = "all ".concat(.3, "s cubic-bezier(0.25, 0.46, 0.45, 0.94)"), Object.assign(n.style, t), r && (n.style.transform = r));
                                var i = (o - a) / 1e3;
                                return i >= .3 ? (Object.assign(n.style, t), r && (n.style.transform = r), n.style.transition = "none", i) : i
                            }
                        }
                    },
                    mo = function(e) {
                        var t = document.querySelector(".plyr");
                        if (!t) return [];
                        var n = t.offsetHeight,
                            o = [],
                            a = "15px" === e.top,
                            r = "15px" === e.bottom,
                            i = "50%" === e.top;
                        return a && o.push(po(I(I({}, e), {}, {
                            top: "".concat(n + 50, "px"),
                            bottom: ""
                        }), e)), i && (o.push(po(I(I({}, e), {}, {
                            top: "-".concat(n / 2, "px"),
                            bottom: ""
                        }), e)), o.push(po(I(I({}, e), {}, {
                            top: "".concat(n + n / 2, "px"),
                            bottom: ""
                        }), e))), r && o.push(po(I(I({}, e), {}, {
                            bottom: "".concat(n + 50, "px"),
                            top: ""
                        }), e)), o
                    };

                function fo() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                    return "dynamic" === We && e ? mo(e) : uo
                }

                function yo(e) {
                    var t = -1;
                    e.addEventListener("timeupdate", (function() {
                        var n, o = e.currentTime,
                            a = Math.floor(o / 4);
                        a % 2 == 0 ? a !== t && (function(e, t) {
                            var n = document.querySelector("#drm-watermark");
                            n && n.remove();
                            var o = document.createElement("div");
                            o.id = "drm-watermark", o.className = "drm-watermark";
                            var a = rn(ze.color);
                            o.style.backgroundColor = "rgba(".concat(a[0], ", ").concat(a[1], ", ").concat(a[2], ", ").concat(ze.opacity, ")"), o.style.position = "absolute", o.style.pointerEvents = "none", o.style.zIndex = "1", o.style.margin = "15px", o.style.padding = "5px";
                            var r = document.createElement("div");
                            r.id = "drm-watermark-text", r.className = "drm-watermark-text", r.style.color = je.fontColor, r.style.fontWeight = "600", r.style.width = "100%", r.style.height = "100%", r.style.display = "flex";
                            var i = je.fontFamily;
                            i && (r.style.fontFamily = {
                                arial: 'arial, "Liberation Sans", "FreeSans", sans-serif',
                                helvetica: 'helvetica, "Helvetica Neue", arial, sans-serif',
                                "times-new-roman": '"Times New Roman", Times, "Liberation Serif", serif',
                                "fredoka-regular": '"Fredoka", sans-serif',
                                rubik: '"Rubik", sans-serif'
                            }[i] || i), vo(je.fontSize)(r), r.innerHTML = Fe.join("<br>"), o.appendChild(r), document.querySelector(".plyr").appendChild(o);
                            var c, l = "dynamic" === We ? (c = [{
                                top: "15px",
                                left: "15px",
                                bottom: "",
                                right: ""
                            }, {
                                top: "15px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                bottom: "",
                                right: ""
                            }, {
                                top: "15px",
                                right: "15px",
                                bottom: "",
                                left: ""
                            }, {
                                top: "50%",
                                left: "15px",
                                transform: "translateY(-50%)",
                                bottom: "",
                                right: ""
                            }, {
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                bottom: "",
                                right: ""
                            }, {
                                top: "50%",
                                right: "15px",
                                transform: "translateY(-50%)",
                                bottom: "",
                                left: ""
                            }, {
                                bottom: "15px",
                                left: "15px",
                                top: "",
                                right: ""
                            }, {
                                bottom: "15px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                top: "",
                                right: ""
                            }, {
                                bottom: "15px",
                                right: "15px",
                                top: "",
                                left: ""
                            }])[Math.floor(Math.random() * c.length)] : function() {
                                var e = [{
                                    top: "15px",
                                    left: "15px",
                                    bottom: "",
                                    right: ""
                                }, {
                                    top: "15px",
                                    right: "15px",
                                    bottom: "",
                                    left: ""
                                }, {
                                    bottom: "15px",
                                    left: "15px",
                                    top: "",
                                    right: ""
                                }, {
                                    bottom: "15px",
                                    right: "15px",
                                    top: "",
                                    left: ""
                                }];
                                return e[Math.floor(Math.random() * e.length)]
                            }();
                            if (o.style.top = l.top || "", o.style.left = l.left || "", o.style.bottom = l.bottom || "", o.style.right = l.right || "", l.transform && (o.style.transform = l.transform), Ze && cancelAnimationFrame(Ze), "dynamic" === We) {
                                var s = fo(l);
                                if (s.length > 0) {
                                    var d = s[Math.floor(Math.random() * s.length)];
                                    Ge = d(o, 0)
                                }
                            } else {
                                var u = fo(),
                                    p = u[Math.floor(Math.random() * u.length)];
                                Ge = p(o, 0)
                            }(Qe = !t.paused) && (Ze = requestAnimationFrame((function e(t) {
                                document.getElementById("drm-watermark") && Qe && (Ge(t), Ze = requestAnimationFrame(e))
                            })))
                        }(0, e), t = a) : ((n = document.querySelector("#drm-watermark")) && n.remove(), Ze && (cancelAnimationFrame(Ze), Ze = null), Qe = !1, Ge = null)
                    })), e.addEventListener("pause", (function() {
                        Qe = !1
                    })), e.addEventListener("play", (function() {
                        var e = document.querySelector("#drm-watermark");
                        if (e)
                            if (Qe = !0, Ze && cancelAnimationFrame(Ze), Ge) {
                                var t = Ge;
                                Ze = requestAnimationFrame((function e(n) {
                                    document.getElementById("drm-watermark") && Qe && (t(n), Ze = requestAnimationFrame(e))
                                }))
                            } else {
                                var n = fo();
                                if (n.length > 0) {
                                    var o = n[Math.floor(Math.random() * n.length)](e, 0);
                                    Ze = requestAnimationFrame((function e(t) {
                                        document.getElementById("drm-watermark") && Qe && (o(t), Ze = requestAnimationFrame(e))
                                    }))
                                }
                            }
                    }))
                }
                var ho = function(e) {
                    var t = {
                        "fredoka-regular": {
                            url: "https://fonts.googleapis.com/css2?family=Fredoka:wght@400&display=swap",
                            family: "Fredoka"
                        },
                        rubik: {
                            url: "https://fonts.googleapis.com/css2?family=Rubik:wght@400&display=swap",
                            family: "Rubik"
                        },
                        helvetica: {
                            url: "https://fonts.googleapis.com/css2?family=Helvetica:wght@400&display=swap",
                            family: "Helvetica"
                        },
                        arial: {
                            url: "https://fonts.googleapis.com/css2?family=Arial:wght@400&display=swap",
                            family: "Arial"
                        }
                    };
                    if (t[e]) {
                        var n = t[e];
                        if (!document.querySelector('link[href="'.concat(n.url, '"]'))) {
                            var o = document.createElement("link");
                            o.rel = "stylesheet", o.href = n.url, document.head.appendChild(o)
                        }
                    }
                };

                function vo(e) {
                    var t = "string" == typeof e ? parseInt(e) : e;
                    return function(e) {
                        var n = window.innerWidth;
                        ! function(e, t) {
                            e.style.fontSize = "".concat(t, "px")
                        }(e, n >= 1024 ? t + 6 : n >= 768 ? t + 3 : n <= 480 ? t - 4 : n <= 460 ? 10 : t > 34 ? t - 8 : t)
                    }
                }

                function go(e) {
                    if (!e) return "00:00";
                    var t = Math.floor(e / 3600),
                        n = Math.floor((e - 3600 * t) / 60),
                        o = e - 3600 * t - 60 * n;
                    return t < 10 && (t = "0" + t), n < 10 && (n = "0" + n), (o = o.toFixed(0)) < 10 && (o = "0" + o), "00" == t ? n + ":" + o : t + ":" + n + ":" + o
                }

                function bo() {
                    var e = document.querySelector("video"),
                        t = null,
                        n = e.getElementsByTagName("source")[0].src;

                    function o(n) {
                        if (n) {
                            var o = 0;
                            Be && !re || (o = n.includes(720) ? 720 : Math.min.apply(Math, S(n)), n.shift()), qt.quality = {
                                default: o,
                                options: n,
                                forced: !0,
                                onChange: function(e) {
                                    eo(e)
                                }
                            }
                        } else qt.quality = {
                            default: 480,
                            options: [360, 480, 720],
                            forced: !0,
                            onChange: function(e) {
                                eo(e)
                            }
                        };
                        pandatag("setupPlayer", (function(n) {
                            player_configs.disableSeeking && (n.listeners = {
                                seek: function(e) {
                                    return e.preventDefault(), !1
                                }
                            });
                            var o = player_configs.controls.findIndex((function(e) {
                                return "current-time" === e
                            })); - 1 === o || "CURRENT_TOTAL_TIME" != player_configs.timeDisplayType && "current" != player_configs.timeDisplayType || player_configs.controls.splice(o + 1, 0, "duration");
                            var r = Po(JSON.parse(JSON.stringify(n.controls)), Lt);
                            r.includes("pip") && we && Me && (r = r.filter((function(e) {
                                return "pip" !== e
                            }))), n.controls = r, t = new(v())(e, n);
                            try {
                                Me && !Be && function() {
                                    if (Me && !window.__pandaIOSSegMon) {
                                        window.__pandaIOSSegMon = !0;
                                        var e = null,
                                            t = 0,
                                            n = !1;
                                        try {
                                            window.PerformanceObserver && new PerformanceObserver((function(e) {
                                                var t, n = B(e.getEntries());
                                                try {
                                                    for (n.s(); !(t = n.n()).done;) {
                                                        var o = t.value;
                                                        null != o && o.name && a(o.name)
                                                    }
                                                } catch (e) {
                                                    n.e(e)
                                                } finally {
                                                    n.f()
                                                }
                                            })).observe({
                                                entryTypes: ["resource"]
                                            })
                                        } catch (e) {}
                                        try {
                                            var o = window.fetch;
                                            window.fetch = function() {
                                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                                var r = t[0];
                                                return "string" == typeof r && a(r), o.apply(this, t)
                                            }
                                        } catch (e) {}
                                    }

                                    function a(o) {
                                        if (null != o && o.includes(".ts") && !n) {
                                            var a = function(e) {
                                                var t = e.match(/(\d+)\.ts/);
                                                return t ? "".concat(t[1], ".ts") : null
                                            }(o);
                                            if (a && (e === a ? t++ : (e = a, t = 1), t >= 20)) try {
                                                var r, i, c = document.querySelector("video"),
                                                    l = null == c ? void 0 : c.getElementsByTagName("source")[0];
                                                if (!c || !l) return;
                                                n = !0;
                                                var s = t,
                                                    d = (null === (r = window.player) || void 0 === r ? void 0 : r.currentTime) || c.currentTime || 0,
                                                    u = (null === (i = window.player) || void 0 === i ? void 0 : i.playbackRate) || c.playbackRate || 1,
                                                    p = c.volume,
                                                    m = c.paused;
                                                c.removeAttribute("src"), c.load();
                                                var f = "https://b-".concat(pe).concat($, "/").concat(le, "/playlist.m3u8");
                                                l.src = f, c.load(), c.onloadedmetadata = function() {
                                                    c.currentTime = localStorage.getItem("panda_video:".concat(le)) || d || 0, c.playbackRate = u, c.volume = p, m || c.play().catch((function() {})), n = !1
                                                }, e = null, t = 0, window.datadogRum && g.v.addError("iOS segment loop detected: ".concat(a), {
                                                    segment: a,
                                                    count: s,
                                                    platform: "iOS",
                                                    action: "player_recreated"
                                                })
                                            } catch (e) {
                                                console.error("[iOS] Error recreating player:", e), n = !1
                                            }
                                        }
                                    }
                                }()
                            } catch (e) {}
                            if (window.player_configs && window.player_configs.initQuality && 0 !== window.player_configs.initQuality) try {
                                var i = JSON.parse(localStorage.getItem("plyr")) || {};
                                i.quality = window.player_configs.initQuality, localStorage.setItem("plyr", JSON.stringify(i)), t.quality = window.player_configs.initQuality
                            } catch (e) {
                                console.log("error", e)
                            }
                            var c, l = Ro(Oo("current-time"));
                            l && "REMAINING_TIME" == player_configs.timeDisplayType && (l.style.display = "none", setTimeout((function() {
                                l.innerHTML = "-".concat(go(t.duration - t.currentTime || 0)), l.style.display = "block", l.addEventListener("click", (function(e) {
                                    e.preventDefault(), e.stopPropagation()
                                }), !0)
                            }), 1200)), (!player_configs.controls.includes("fullscreen") || player_configs.iosFakeFullscreen && Me) && t.eventListeners.forEach((function(e) {
                                "dblclick" === e.type && e.element.removeEventListener(e.type, e.callback, e.options)
                            })), "online" !== ee.status && "active" !== ee.status || ((c = document.createElement("button")).setAttribute("class", "panda-live-chat plyr__control plyr__controls__item"), c.setAttribute("type", "button"), c.addEventListener("click", (function() {
                                var e = Z.searchParams.get("redirectChatClick"),
                                    t = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
                                if (!e || t) {
                                    window.innerWidth;
                                    var n = document.querySelector(".live-chat-container"),
                                        o = document.getElementsByClassName("plyr")[0];
                                    if (n) n.classList.contains("disabled") ? (n.classList.remove("disabled"), An("remove"), Pn()) : (n.style.height = "0px", n.classList.add("disabled"));
                                    else {
                                        var a = document.createElement("div");
                                        a.classList.add("live-chat-container"), a.innerHTML = Dt(), o.style.flexDirection = "row", o.insertAdjacentElement("beforeend", a), Pn()
                                    }
                                } else window.parent.postMessage({
                                    message: "panda_redirect_chat_click",
                                    value: e
                                }, "*")
                            })), c.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 18V21.766L6.515 20.857L11.277 18H16C17.103 18 18 17.103 18 16V8C18 6.897 17.103 6 16 6H4C2.897 6 2 6.897 2 8V16C2 17.103 2.897 18 4 18H5ZM4 8H16V16H10.723L7 18.234V16H4V8Z" fill="white"/><path d="M20 2H8C6.897 2 6 2.897 6 4H18C19.103 4 20 4.897 20 6V14C21.103 14 22 13.103 22 12V4C22 2.897 21.103 2 20 2Z" fill="white"/></svg>', en(c, "live-chat"));
                            var s = document.getElementsByClassName("loading-icon")[0];
                            Ne || To(s, "disabled"), window.player = t,
                                function(e, t) {
                                    for (var n = '<div class="plyr__controls__item plyr__controls__spacer" style="flex: 1 1 0%;"></div>', o = 0, a = ["duration", "current-time", "volume", "mute", "fast-forward", "rewind", "play"]; o < a.length; o++) {
                                        var r = a[o];
                                        if (t.includes(r)) return Ro(Oo(r)).insertAdjacentHTML("afterend", n)
                                    }
                                    e.insertAdjacentHTML("afterbegin", n)
                                }(t.elements.controls, r),
                                function() {
                                    try {
                                        var n = document.getElementsByTagName("video")[0];
                                        n.addEventListener("webkitbeginfullscreen", (function() {
                                            To(document.querySelector("div.plyr"), "fullscreen")
                                        }), !1), n.addEventListener("webkitendfullscreen", (function() {
                                            So(document.querySelector("div.plyr"), "fullscreen")
                                        }), !1)
                                    } catch (e) {}
                                    var o = ["progress", "ready", "play", "pause", "timeupdate", "seeking", "seeked", "ended", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "canplay", "error"],
                                        r = {};
                                    o.forEach((function(e) {
                                        t.on(e, (function() {
                                            var n = (new Date).getTime();
                                            if (!r[e] || n - r[e] > 30) {
                                                r[e] = n;
                                                var o, a = B(_t);
                                                try {
                                                    for (a.s(); !(o = a.n()).done;) {
                                                        var i = o.value;
                                                        i.iframe.contentWindow && i.iframe.contentWindow.postMessage({
                                                            message: "panda_" + e,
                                                            video: le,
                                                            currentTime: t.currentTime,
                                                            isMutedIndicator: !(!player_configs.mutedIndicatorIcon || rt),
                                                            isPreviousProgressLoaded: ct
                                                        }, "*")
                                                    }
                                                } catch (e) {
                                                    a.e(e)
                                                } finally {
                                                    a.f()
                                                }
                                                if ("ready" === e && Ne) return;
                                                window.parent.postMessage({
                                                    message: "panda_" + e,
                                                    video: le,
                                                    currentTime: t.currentTime,
                                                    isMutedIndicator: !(!player_configs.mutedIndicatorIcon || rt),
                                                    isPreviousProgressLoaded: ct
                                                }, "*")
                                            }
                                        }))
                                    })), player_configs.smartAutoplay && Bt.forEach((function(e) {
                                        window.addEventListener(e, a)
                                    })), ye && window.parent.postMessage({
                                        message: "panda_ready_comparison",
                                        video: ye,
                                        video_external_id: le
                                    }, "*"), t.on("languagechange", (function() {
                                        var e, n = null === (e = t) || void 0 === e || null === (e = e.captions) || void 0 === e ? void 0 : e.language;
                                        if (n)
                                            if (Be) {
                                                var o = window.hls.subtitleTracks.find((function(e) {
                                                    return e.lang === n
                                                }));
                                                o && (window.hls.subtitleTrack = o.id)
                                            } else
                                                for (var a = document.getElementsByTagName("video")[0], r = 0; r < a.textTracks.length; r++) a.textTracks[r].language === n ? a.textTracks[r].mode = "showing" : a.textTracks[r].mode = "hidden"
                                    })), (player_configs.playOpensFullscreen || player_configs.playOpensFullscreenNative) && (t.on("play", (function() {
                                        player_configs.mutedIndicatorIcon && !rt || (player_configs.playOpensFullscreenNative ? t.fullscreen.enter() : window.parent.postMessage({
                                            message: "panda_open_window_fullscreen",
                                            video: le
                                        }, "*"))
                                    })), t.on("pause", (function() {
                                        player_configs.playOpensFullscreenNative ? t.fullscreen.exit() : window.parent.postMessage({
                                            message: "panda_close_window_fullscreen",
                                            video: le
                                        }, "*")
                                    }))), player_configs.disablePause && t.on("pause", (function() {
                                        t.duration !== t.currentTime && t.play().catch((function() {}))
                                    }));
                                    var i = t.speed,
                                        c = t.config.speed.turbo;

                                    function l(e) {
                                        document.querySelectorAll('[data-plyr="speed"]').forEach((function(t) {
                                            t.getAttribute("value") === String(e) ? t.setAttribute("aria-checked", "true") : t.setAttribute("aria-checked", "false")
                                        }))
                                    }
                                    if (window.__pandaSpeedListenerSet || (window.__pandaSpeedListenerSet = !0, t.on("ratechange", (function() {
                                            var e = t.speed;
                                            if (e !== i) {
                                                if (l(i = e), i !== c) try {
                                                    localStorage.setItem("user-plyr-speed-config", i)
                                                } catch (e) {}
                                                T(), window.parent.postMessage({
                                                    message: "panda_speed_update",
                                                    video: le,
                                                    speed: i
                                                }, "*")
                                            }
                                        }))), t.on("timeupdate", (function(e) {
                                            var n, o, a, r;
                                            he && Ke && (n = t.currentTime, o = hls.media.duration, a = Math.round(1e4 * n) / 1e4, r = Math.round(1e4 * o) / 1e4, Math.abs(a - r) <= .01 && So(document.getElementsByClassName("live-offline-badge")[0], "disabled"));
                                            var i = parseInt(t.currentTime, 10);
                                            i % 5 == ie % 5 && ie !== i && wo({}), t.currentTime > 0 && dt.length && (dt.forEach((function(e) {
                                                "currentTime" === e.type && t.playing && (t.currentTime = e.value)
                                            })), dt = []);
                                            var c = Ro(Oo("current-time"));
                                            "REMAINING_TIME" != player_configs.timeDisplayType || "online" === Je || he || (c.innerHTML = "-".concat(go(t.duration - t.currentTime || 0))), ["CURRENT_TIME"].includes(player_configs.timeDisplayType) && "online" !== Je && !he && (c.innerHTML = go(t.currentTime || 0))
                                        })), Ne) {
                                        var s = function() {
                                                t.once("progress", (function() {
                                                    t.once("timeupdate", (function() {
                                                        if (to(!1), !player_configs.disablePause && d) return d.style.visibility = "visible"
                                                    }))
                                                }))
                                            },
                                            d = document.querySelector('button[data-plyr="play"].plyr__control--overlaid');
                                        t.once("play", (function() {
                                            if (F.checkPlayerVolume(), !t.seeking) return s();
                                            t.once("seeked", (function() {
                                                return s()
                                            }))
                                        }))
                                    }

                                    function u(e) {
                                        t.currentTime = e
                                    }

                                    function p() {
                                        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).reload,
                                            n = void 0 !== e && e;
                                        if (!player_configs.mutedIndicatorIcon || rt) {
                                            var o = parseInt(t.currentTime.toFixed(0)),
                                                a = player_configs.ctas.filter((function(e) {
                                                    return (o > e.time + e.duration || o < e.time) && "video" === e.type && !!e.removed
                                                }));
                                            a.length && (player_configs.ctas = player_configs.ctas.map((function(e) {
                                                return a.find((function(t) {
                                                    return t.id === e.id
                                                })) && (e.removed = !1), e
                                            })));
                                            var r = player_configs.ctas.find((function(e) {
                                                var t = document.getElementById(e.id);
                                                if (t) {
                                                    if (!n) return !1;
                                                    t.remove()
                                                }
                                                return e.time <= o && e.time + e.duration >= o && "video" === e.type && !e.removed
                                            }));
                                            if (r) {
                                                var i, c, l = document.getElementsByClassName("plyr--html5")[0],
                                                    s = (document.getElementsByClassName("plyr__controls"), document.createElement("div"));
                                                s.onmouseenter = function() {
                                                    var e = document.getElementsByClassName("plyr--hide-controls");
                                                    e && e[0] && So(e[0], "plyr--hide-controls")
                                                }, s.id = r.id, null != r && r.pauseVideo && window.postMessage({
                                                    type: "pause"
                                                }, "*"), To(s, "cta-overlay"), To(s, "cta-element"), "full" === r.width && (s.style.width = "100%", s.style.height = "".concat(r.height, "px"));
                                                var d = document.createElement("iframe");
                                                if (null != r && null !== (i = r.metadata) && void 0 !== i && i.isMiniTrigger && (s.style.opacity = 0, s.style.transition = "opacity ".concat(r.metadata.fadeConfigs.fadeInMs, "ms")), null != r && null !== (c = r.metadata) && void 0 !== c && c.selectedButtonSize && (s.style.zIndex = 3, te && r.metadata.link && !r.metadata.wereQueryParamsMerged)) {
                                                    var u = function(e, t) {
                                                        var n = function(e) {
                                                                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                                                    n = e.indexOf("?");
                                                                return n >= 0 ? (t && (n += 1), e.slice(n)) : ""
                                                            }(e, !0),
                                                            o = {
                                                                targetContent: "",
                                                                newContent: ""
                                                            };
                                                        if (n) {
                                                            var a = E(n),
                                                                r = E(t),
                                                                i = k(k({}, a), r);
                                                            o.targetContent = n, o.newContent = function(e) {
                                                                var t = new URLSearchParams;
                                                                for (var n in e) e.hasOwnProperty(n) && t.append(n, e[n]);
                                                                return t.toString()
                                                            }(i)
                                                        } else o.targetContent = e, o.newContent = "".concat(e, "?").concat(t);
                                                        return o
                                                    }(r.metadata.link, te);
                                                    r.script = r.script.replace(u.targetContent, u.newContent), r.metadata.wereQueryParamsMerged = !0
                                                }
                                                if (r.maxZIndex && (s.style.zIndex = 99999), r.height && r.width) {
                                                    var p = function() {
                                                        var e = window.innerWidth,
                                                            t = window.innerHeight,
                                                            n = {
                                                                topLeft: function() {
                                                                    d.style.top = "30px", d.style.left = "30px"
                                                                },
                                                                fixedTopLeft: function() {
                                                                    d.style.top = "0", d.style.left = "0"
                                                                },
                                                                topCenter: function() {
                                                                    var t = parseInt(d.style.width.replace("px", ""), 10);
                                                                    d.style.top = "30px", d.style.left = e / 2 - t / 2 + "px"
                                                                },
                                                                topRight: function() {
                                                                    d.style.top = "30px", d.style.right = "30px"
                                                                },
                                                                midLeft: function() {
                                                                    var e = parseInt(d.style.height.replace("px", ""), 10);
                                                                    d.style.top = t / 2 - e / 2 + "px", d.style.left = "30px"
                                                                },
                                                                midCenter: function() {
                                                                    var n = parseInt(d.style.height.replace("px", ""), 10),
                                                                        o = parseInt(d.style.width.replace("px", ""), 10);
                                                                    d.style.top = t / 2 - n / 2 + "px", d.style.left = e / 2 - o / 2 + "px"
                                                                },
                                                                midRight: function() {
                                                                    var e = parseInt(d.style.height.replace("px", ""), 10);
                                                                    d.style.top = t / 2 - e / 2 + "px", d.style.right = "30px"
                                                                },
                                                                bottomLeft: function() {
                                                                    d.style.bottom = "70px", d.style.left = "30px"
                                                                },
                                                                bottomCenter: function() {
                                                                    d.style.bottom = "70px";
                                                                    var t = parseInt(d.style.width.replace("px", ""), 10);
                                                                    d.style.left = e / 2 - t / 2 + "px"
                                                                },
                                                                bottomRight: function() {
                                                                    d.style.bottom = "70px", d.style.right = "30px"
                                                                }
                                                            };
                                                        "full" === r.width ? (d.style.height = "".concat(r.height, "px"), d.style.width = "100%", d.style.top = 0, d.style.left = 0) : e >= 450 ? (d.style.height = r.height.large + "px", d.style.width = r.width.large + "px") : e < 450 && e > 300 ? (d.style.height = r.height.medium + "px", d.style.width = r.width.medium + "px") : e <= 300 && (d.style.height = r.height.small + "px", d.style.width = r.width.small + "px"), r.position && n[r.position]()
                                                    };
                                                    d.style.position = "absolute", d.style.zIndex = 999, p(), window.onresize = p
                                                }
                                                if (d.id = "".concat(r.id, "_iframe"), d.onload = function() {
                                                        Jt(d.contentWindow.document.body);
                                                        var e = document.getElementById("".concat(r.id, "_iframe")),
                                                            t = /<script>(.|\n)*?<\/script>/gm,
                                                            n = r.script.match(t),
                                                            o = r.script.replace(t, "");
                                                        if (n && n.length) {
                                                            var a = n[0].replace("<script>", "").replace("<\/script>", ""),
                                                                i = document.createElement("script");
                                                            i.type = "text/javascript", i.innerHTML = a, e.contentWindow.document.body.innerHTML = "".concat(o), e.contentWindow.document.body.appendChild(i)
                                                        } else e.contentWindow.document.body.innerHTML = "".concat(o);
                                                        e.contentWindow.document.body.style = "padding:0;margin:0"
                                                    }, _t.find((function(e) {
                                                        return e.id === r.id
                                                    })) || _t.push({
                                                        iframe: d,
                                                        id: r.id
                                                    }), s.appendChild(d), r.skipButton) {
                                                    var m = document.createElement("button");
                                                    m.innerHTML = "Continuar assistindo", To(m, "cta-skip-button"), m.onclick = function() {
                                                        window.postMessage({
                                                            type: "play"
                                                        }, "*")
                                                    }, s.appendChild(m)
                                                }
                                                l.appendChild(s), s.style.opacity = 1
                                            }
                                            var f = player_configs.ctas.find((function(e) {
                                                return !!document.getElementById(e.id) && (e.time + e.duration < o || e.time > o)
                                            }));
                                            if (f) {
                                                if (null != f && f.pauseVideoEnd && (null == f ? void 0 : f.time) + (null == f ? void 0 : f.duration) < o) return void window.postMessage({
                                                    type: "pause"
                                                }, "*");
                                                var y, h = document.getElementById(f.id);
                                                h && (null != f && null !== (y = f.metadata) && void 0 !== y && y.isMiniTrigger ? (h.style.transition = "opacity ".concat(f.metadata.fadeConfigs.fadeOutMs, "ms"), h.style.opacity = 0, setTimeout((function() {
                                                    h.remove()
                                                }), f.metadata.fadeConfigs.fadeOutMs)) : h.remove()), _t = _t.filter((function(e) {
                                                    return e.id !== f.id
                                                }))
                                            }
                                        }
                                    }

                                    function m() {
                                        "http" === player_configs.endThumbnail.substr(0, 4) && (player_configs.ctas = player_configs.ctas.filter((function(e) {
                                            return "end" !== e.type
                                        })), player_configs.ctas.push({
                                            type: "end",
                                            id: "endThumb",
                                            script: "<img src='".concat(player_configs.endThumbnail, "' style='object-fit:cover; width:100%; height:100%;'><script>document.querySelector('img').onclick=function() { window.parent.postMessage({type: 'cta_play',}, '*') }</scr") + "ipt>"
                                        })), "http" === player_configs.pauseThumbnail.substr(0, 4) && (player_configs.ctas || (player_configs.ctas = []), player_configs.ctas = player_configs.ctas.filter((function(e) {
                                            return "pause" !== e.type
                                        })), player_configs.ctas.push({
                                            type: "pause",
                                            id: "pauseThumb",
                                            script: "<img src='".concat(player_configs.pauseThumbnail, "' style='object-fit:cover; width:100%; height:100%;'><script>document.querySelector('img').onclick=function() { window.parent.postMessage({type: 'cta_play',}, '*') }</scri") + "pt>"
                                        })), player_configs.ctas && player_configs.ctas.length > 0 && (t.on("play", (function() {
                                            var e = document.getElementById("end-cta");
                                            e && To(e, "disabled");
                                            var t, n = B(document.getElementsByClassName("pause-cta"));
                                            try {
                                                for (n.s(); !(t = n.n()).done;) To(t.value, "disabled")
                                            } catch (e) {
                                                n.e(e)
                                            } finally {
                                                n.f()
                                            }
                                        })), t.on("pause", (function() {
                                            var e = parseInt(t.currentTime, 10),
                                                n = parseInt(t.duration, 10);
                                            if (!t.seeking && e !== n) {
                                                var o = player_configs.ctas.find((function(t) {
                                                    return "pause" === t.type && (void 0 === t.startTime || void 0 === t.endTime || t.startTime < e && t.endTime > e)
                                                }));
                                                if (!o) return;
                                                var a = document.getElementById(o.id);
                                                a && So(a, "disabled")
                                            }
                                        })), t.on("ended", (function() {
                                            window.onEnd && window.onEnd()
                                        })), t.on("timeupdate", p))
                                    }

                                    function f() {
                                        var e = parseInt(t.currentTime.toFixed(0), 10);
                                        if (parseInt(t.duration.toFixed(0), 10) - e > 30) {
                                            var n = document.getElementById("live-time-indicator");
                                            n && To(n, "not-realtime"), h = !1
                                        } else {
                                            h = !0;
                                            var o = document.querySelector(".plyr__progress input");
                                            o && (To(o, "hide-slyder-badge"), o.style = "--value: 100%;"), So(document.getElementById("live-time-indicator"), "not-realtime")
                                        }
                                        if (!h) {
                                            var a = document.querySelector(".plyr__progress input");
                                            a && So(a, "hide-slyder-badge")
                                        }
                                    }
                                    if (t.on("play", (function() {
                                            dt.length && (dt.forEach((function(e) {
                                                "currentTime" === e.type && t.playing && (t.currentTime = e.value)
                                            })), dt = []), xo()
                                        })), player_configs.restartAfterEnd && (player_configs.onlyLoopMuted ? t.muted && t.on("ended", (function() {
                                            u(0), t.play().catch((function() {}))
                                        })) : t.on("ended", (function() {
                                            u(0), t.play().catch((function() {}))
                                        }))), player_configs.videoRedirect && t.on("ended", (function() {
                                            window.postMessage({
                                                type: "redirect_video",
                                                parameter: {
                                                    videoId: player_configs.videoRedirect.externalId
                                                }
                                            }, "*")
                                        })), m(), player_configs.alternativeProgress && t.on("timeupdate", (function() {
                                            var e, n = parseFloat(t.currentTime.toFixed(3), 10),
                                                o = parseFloat(t.duration.toFixed(3), 10),
                                                a = document.querySelector(".alternative-progress");
                                            if (player_configs.alternativeProgressDefaultVelocity) {
                                                var r = n / o;
                                                e = 100 * Math.sqrt(1 - (r -= 1) * r)
                                            } else {
                                                var i = player_configs.alternativeProgress2xLimit,
                                                    c = player_configs.alternativeProgressVelocity,
                                                    l = i / 100 / c;
                                                e = n < o * l ? (e = 100 * n / o * c).toFixed(2) : i + (n - o * l) * (100 - i) / (o * (1 - l))
                                            }
                                            a && e && (a.style = "--value-progress: " + e + "%;"), player_configs.alternativeProgressHeight && a && (a.style = "--value-progress: " + e + "%;height: " + player_configs.alternativeProgressHeight + "px;")
                                        })), "boolean" == typeof player_configs.hideControlsOnStart && player_configs.hideControlsOnStart || "string" == typeof player_configs.hideControlsOnStart && "true" == player_configs.hideControlsOnStart.toLowerCase()) {
                                        var y = document.querySelector(".plyr__controls");
                                        y && To(y, "disabled"), t.on("play", (function(e) {
                                            var t = document.querySelector(".plyr__controls");
                                            t && So(t, "disabled")
                                        }))
                                    }
                                    he && "online" === Je && (t.on("timeupdate", f), t.on("seeking", (function() {
                                        So(document.querySelector(".plyr__progress input"), "hide-slyder-badge"), f()
                                    })), t.on("seeked", (function() {
                                        var e = parseInt(t.currentTime.toFixed(0), 10),
                                            n = parseInt(t.duration.toFixed(0), 10);
                                        n - e > 10 && n - e < 30 && window.postMessage({
                                            type: "currentTime",
                                            parameter: -1
                                        }, "*")
                                    }))), player_configs.saveProgress && t.on("timeupdate", (function() {
                                        var e = parseInt(t.currentTime.toFixed(0), 10),
                                            n = parseInt(t.duration.toFixed(0), 10);
                                        if (0 != e && rt)
                                            if (100 * e / n > 90) try {
                                                localStorage.removeItem("panda_video:" + le)
                                            } catch (e) {} else try {
                                                localStorage.setItem("panda_video:" + le, e)
                                            } catch (e) {} else if (Ce && ![document.querySelector(".small-muted-icon"), document.querySelector(".panda-muted-indicator-item")].some((function(e) {
                                                    return e && !Eo(e, "disabled")
                                                })) && ct) try {
                                                localStorage.setItem("panda_video:" + le, e)
                                            } catch (e) {}
                                    }));
                                    var h = !0,
                                        v = 0,
                                        g = [],
                                        b = [];

                                    function w(n) {
                                        if (player_configs.saveProgressScreen) {
                                            var o = document.querySelector('button[data-plyr="play"].plyr__control--overlaid');
                                            player_configs.autoplay ? (t.muted = !0, t.play()) : (t.pause(), To(o, "disabled")), e.style.visibility = "hidden";
                                            var a = document.querySelector(".container"),
                                                r = document.createElement("div");
                                            To(r, "panda-resume-screen-wrapper"), r.style = "opacity: " + player_configs.saveProgressBackgroundOpacity + ";";
                                            var i = document.createElement("p");
                                            i.innerText = player_configs.saveProgressTitle;
                                            var c = document.createElement("div");
                                            To(c, "panda-resume-screen-buttons");
                                            var l = document.createElement("button");
                                            l.innerHTML = '<svg viewBox="0 0 24 24">\n                                  <path fill="var(--plyr-video-control-color)" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z" />\n                              </svg><span>' + player_configs.saveProgressButton1Title + "</span>", l.onclick = function() {
                                                Te ? (t.currentTime = n - 1, d()) : (window.onLoadVideoWithoutPreload || (window.onLoadVideoWithoutPreload = []), window.onLoadVideoWithoutPreload.push((function() {
                                                    t.currentTime = n, d()
                                                })), window.onLoadVideoWithoutPreload.forEach((function(e) {
                                                    return e()
                                                }))), _o({})
                                            };
                                            var s = document.createElement("button");
                                            s.innerHTML = '<svg viewBox="0 0 24 24">\n                                  <path fill="var(--plyr-video-control-color)" d="M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z" />\n                              </svg><span>' + player_configs.saveProgressButton2Title + "<span>", s.onclick = function() {
                                                it = !0, t.currentTime = 0, d()
                                            }, c.appendChild(l), c.appendChild(s), r.appendChild(i), r.appendChild(c), a.appendChild(r)
                                        }

                                        function d() {
                                            var n;
                                            setTimeout((function() {
                                                try {
                                                    try {
                                                        t.play().catch((function() {})), rt = !0
                                                    } catch (e) {}
                                                } catch (e) {}
                                            }), 0), So(o, "disabled"), (n = document.getElementById("wrapper-progress")) && So(n, "disabled"), To(r, "disabled"), e.style.visibility = "visible", t.volume = 1, _o({})
                                        }
                                    }
                                    t.on("timeupdate", (function() {
                                        var e = parseInt(t.currentTime.toFixed(0), 10),
                                            n = parseInt(t.duration.toFixed(0), 10);
                                        if ("online" === Je && Ye && !h && window.pb.updateLengthForLiveStream(n), 0 !== e && !1 === t.muted) {
                                            var o = parseInt(100 * e / n, 10);
                                            if (!g.includes(o)) {
                                                var a, r = player_configs.customPixels.filter((function(e) {
                                                        return "percentage" === e.conditionType && e.conditionValue === o
                                                    })),
                                                    i = B(r);
                                                try {
                                                    for (i.s(); !(a = i.n()).done;) {
                                                        var c = a.value,
                                                            l = new Function(c.script);
                                                        try {
                                                            l()
                                                        } catch (e) {}
                                                    }
                                                } catch (e) {
                                                    i.e(e)
                                                } finally {
                                                    i.f()
                                                }
                                                g.push(o)
                                            }
                                            if (!b.includes(e)) {
                                                var s, d = player_configs.customPixels.filter((function(t) {
                                                        return "absolute" === t.conditionType && t.conditionValue === e
                                                    })),
                                                    u = B(d);
                                                try {
                                                    for (u.s(); !(s = u.n()).done;) {
                                                        var p = s.value,
                                                            m = new Function(p.script);
                                                        try {
                                                            m()
                                                        } catch (e) {}
                                                    }
                                                } catch (e) {
                                                    u.e(e)
                                                } finally {
                                                    u.f()
                                                }
                                                b.push(e)
                                            }
                                            if (o % 5 == 0 && o !== v) {
                                                if (v = o, player_configs.fbPixel.length > 0) try {
                                                    rt && fbq("track", "panda_watchtime_".concat(o, "%"), {
                                                        percent: o,
                                                        video_id: le,
                                                        library_id: "b-" + pe,
                                                        duration: n,
                                                        current_time: e
                                                    })
                                                } catch (e) {}
                                                if (player_configs.gtagIds.length > 0) try {
                                                    rt && gtag("event", "panda_watchtime_".concat(o, "%"), {
                                                        percent: o,
                                                        video_id: le,
                                                        library_id: "b-" + pe,
                                                        duration: n,
                                                        current_time: e
                                                    })
                                                } catch (e) {}
                                                if (o % 10 == 0) {
                                                    if (player_configs.fbPixel.length > 0) try {
                                                        rt && fbq("track", "pandavideo_watchtime", {
                                                            percent: o,
                                                            video_id: le,
                                                            library_id: "b-" + pe,
                                                            duration: n,
                                                            current_time: e
                                                        })
                                                    } catch (e) {}
                                                    if (player_configs.gtagIds.length > 0) try {
                                                        rt && gtag("event", "pandavideo_watchtime", {
                                                            percent: o,
                                                            video_id: le,
                                                            library_id: "b-" + pe,
                                                            duration: n,
                                                            current_time: e
                                                        })
                                                    } catch (e) {}
                                                }
                                            }
                                        }
                                    })), t.once("play", (function(e) {
                                        if (!player_configs.autoplay) {
                                            try {
                                                if (player_configs.controls.includes("volume") || (t.volume = 1), Pe && !rt) {
                                                    var n = document.querySelector("video");
                                                    if (!n) return;
                                                    var o = function() {
                                                            var e = n.currentTime;
                                                            n.currentTime = e + .01, setTimeout((function() {
                                                                return n.currentTime = e
                                                            }), 100)
                                                        },
                                                        a = function() {
                                                            return n.buffered.length > 0 && n.buffered.end(0) > n.currentTime + .5
                                                        };
                                                    if (a()) o();
                                                    else {
                                                        var r = ["progress", "canplay"],
                                                            i = function e() {
                                                                a() && (r.forEach((function(t) {
                                                                    return n.removeEventListener(t, e)
                                                                })), o())
                                                            };
                                                        r.forEach((function(e) {
                                                            return n.addEventListener(e, i)
                                                        })), setTimeout((function() {
                                                            return r.forEach((function(e) {
                                                                return n.removeEventListener(e, i)
                                                            }))
                                                        }), 5e3)
                                                    }
                                                }
                                                _o({})
                                            } catch (e) {}
                                            rt = !0
                                        }
                                        var c = document.querySelector('button[data-plyr="play"].plyr__control--overlaid');
                                        if (c && So(c, "disabled"), To(document.getElementsByClassName("loading-icon")[0], "disabled"), To(document.querySelector("div.plyr__poster"), "disabled"), player_configs.initSubtitle) {
                                            var l = document.querySelector(".plyr__controls");
                                            l && So(l, "disabled")
                                        }
                                        setTimeout((function() {
                                            var e = document.querySelector(".plyr__poster");
                                            e.classList.contains("disabled") || To(e, "disabled")
                                        }), 1e3), Te || ve || oo()
                                    })), t.once("canplay", (function() {
                                        var n, o = document.querySelector(".plyr__poster");
                                        o && So(o, "thumbnail-blur"), Me && $n(), Me && player_configs.lipsync_info && player_configs.lipsync_info.length && Co(), "regular" === Ve && Ue && function() {
                                            var e = document.querySelector(".plyr");
                                            je.fontFamily && ho(je.fontFamily);
                                            var t = document.createElement("div");
                                            t.id = "drm-watermark", t.className = "drm-watermark";
                                            var n = rn(ze.color);
                                            t.style.backgroundColor = "rgba(".concat(n[0], ", ").concat(n[1], ", ").concat(n[2], ", ").concat(ze.opacity, ")"), t.style.position = "absolute", t.style.pointerEvents = "none", t.style.zIndex = "1", t.style.margin = "15px", t.style.padding = "5px", t.style.display = "none";
                                            var o = document.createElement("div");
                                            o.id = "drm-watermark-text", o.className = "drm-watermark-text", o.style.color = je.fontColor, o.style.fontWeight = "600";
                                            var a = vo(je.fontSize);
                                            a(o);
                                            var r = new ResizeObserver((function() {
                                                a(o)
                                            }));
                                            r.observe(e);
                                            var i = je.fontFamily;
                                            i && (o.style.fontFamily = {
                                                arial: 'arial, "Liberation Sans", "FreeSans", sans-serif',
                                                helvetica: 'helvetica, "Helvetica Neue", arial, sans-serif',
                                                "times-new-roman": '"Times New Roman", Times, "Liberation Serif", serif',
                                                "fredoka-regular": '"Fredoka", sans-serif',
                                                rubik: '"Rubik", sans-serif'
                                            }[i] || i), o.style.width = "100%", o.style.height = "100%", o.style.display = "flex", o.innerHTML = Fe.join("<br>"), t.appendChild(o), e.appendChild(t);
                                            var c = e.querySelector("video");
                                            c && (yo(c), c.addEventListener("destroy", (function() {
                                                r.disconnect()
                                            })))
                                        }(), rt && t.play(), it && (t.currentTime = 0, t.play()), player_configs.startsWithSubtitle && ((JSON.parse(localStorage.getItem("plyr")) || {}).captions = !0, window.player.captions.active = !0, window.player.toggleCaptions(!0)), $e && we && setTimeout((function() {
                                            So(document.getElementsByClassName("plyr__controls")[0], "disabled")
                                        }), 2e3), Z.searchParams.get("audioTrack") || function() {
                                            var e = null;
                                            try {
                                                e = localStorage.getItem("panda_video_audio_lang")
                                            } catch (e) {}
                                            if (e) {
                                                var t, n = B(Qn());
                                                try {
                                                    var o = function() {
                                                        var n = t.value;
                                                        if (n.lang === e) return setTimeout((function() {
                                                            Jn(n.id)
                                                        }), 100), 1
                                                    };
                                                    for (n.s(); !(t = n.n()).done && !o(););
                                                } catch (e) {
                                                    n.e(e)
                                                } finally {
                                                    n.f()
                                                }
                                            }
                                        }(), window.addEventListener("blur", (function() {
                                            Nn()
                                        }));
                                        try {
                                            n = localStorage.getItem("panda_video:" + le)
                                        } catch (e) {}
                                        var a = player_configs.defaultSpeed;
                                        try {
                                            localStorage.getItem("user-plyr-speed-config")
                                        } catch (e) {}
                                        if (t.speed = a || player_configs.defaultSpeed, n && player_configs.saveProgressScreen || !player_configs.autoplay || rt ? (t.volume < .5 || t.muted) && !$e && (t.muted = !1, t.volume = 1) : player_configs.smartAutoplay ? (t.muted = !1, t.volume = 1, t.play().then((function() {
                                                on(), tn()
                                            })).catch((function(e) {
                                                "NotAllowedError" === e.name && (t.muted = !0, t.play())
                                            })), e.autoplay = "") : (t.muted = !0, t.play()), player_configs.saveProgressScreen && n && player_configs.autoplay ? (t.muted = !0, t.play()) : player_configs.saveProgressScreen && n && !player_configs.autoplay && !rt ? t.pause() : n && player_configs.saveProgress && !it && u(parseInt(n)), Z.searchParams.get("startTime") && u(parseInt(Z.searchParams.get("startTime"), 10)), Z.searchParams.get("audioTrack")) {
                                            var r = parseInt(Z.searchParams.get("audioTrack"), 10);
                                            Jn(r)
                                        }
                                        if (ct = !0, Te || window.onLoadVideoWithoutPreload && window.onLoadVideoWithoutPreload.forEach((function(e) {
                                                return e()
                                            })), player_configs.controls.includes("captions") || Mo(), Ne) {
                                            To(document.getElementsByClassName("loading-icon")[0], "disabled");
                                            var i = null;
                                            try {
                                                i = localStorage.getItem("panda_video:" + le)
                                            } catch (e) {}
                                            if (player_configs.saveProgressScreen && i) return;
                                            t.play()
                                        }
                                        ko(), xo();
                                        var c = Ro(Oo("current-time"));
                                        "REMAINING_TIME" == player_configs.timeDisplayType && (c.style.display = "none", setTimeout((function() {
                                            c.innerHTML = "-".concat(go(t.duration - t.currentTime || 0)), c.style.display = "block", c.addEventListener("click", (function(e) {
                                                e.preventDefault(), e.stopPropagation()
                                            }), !0)
                                        }), 1200)), ["CURRENT_TIME"].includes(player_configs.timeDisplayType) && "online" !== Je && !he && setTimeout((function() {
                                            c.innerHTML = go(t.currentTime || 0), c.style.display = "block", c.addEventListener("click", (function(e) {
                                                e.preventDefault(), e.stopPropagation()
                                            }), !0)
                                        }), 1e3)
                                    })), t.on("ready", (function(n) {
                                        var o, a, r;
                                        if (function() {
                                                ! function() {
                                                    try {
                                                        var e = document.getElementById("copy-paste");
                                                        e && e.remove()
                                                    } catch (e) {}
                                                }();
                                                try {
                                                    var e = document.createElement("div");
                                                    e.id = "report-problem-dialog", To(e, "disabled"), e.innerHTML = '<div id="copy-paste"><header> <p class="report-problem-text">'.concat(mt[ut].reportModalTitle, '</p></header> <div id="report-first-step"> <section id="radio-section"> <div> <input type="radio" id="report-not-loading" name="issue-reported" value="report-not-loading" checked> <label for="report-not-loading">').concat(mt[ut].reportModalOption1, '</label><br></div><div> <input type="radio" id="report-unmatch-description" name="issue-reported" value="report-unmatch-description"> <label for="report-unmatch-description">').concat(mt[ut].reportModalOption2, '</label> </div><div> <input type="radio" id="report-low-quality" name="issue-reported" value="report-low-quality"> <label for="report-low-quality">').concat(mt[ut].reportModalOption3, '</label> </div><div> <input type="radio" id="report-other" name="issue-reported" value="report-other"> <label for="report-other">').concat(mt[ut].reportModalOption4, '</label><br></div><div class="report-textfield-card"> <div id="other-input-wrapper" class="disabled"> <input class="other-input" type="text" id="other-input" name="other" placeholder="').concat(mt[ut].reportModalField, '"> </div></div></section> <footer> <button id="report-second-step-btn" class="report-problem-dialog-button">').concat(mt[ut].reportModalAction1, '</button> <button id="report-close-dialog-btn" class="report-problem-dialog-button">').concat(mt[ut].reportModalAction2, '</button> </footer> </div><div id="report-second-step" class="disabled"> <div id="loading-div"> <svg viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"> <path fill="#4874F1" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"> <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"/> </path> </svg> </div><p id="second-step-text">').concat(mt[ut].reportModalText1, " <br/> ").concat(mt[ut].reportModalText2, '</p></div><div id="report-third-step" class="disabled ').concat(se ? "" : "alone", '"> <header> ').concat(se ? '<img id="panda-last-step-img" src="./icons/pandacheck.svg"/>' : "", ' </header> <p class="report-problem-text">').concat(mt[ut].reportModalText3, '</p><footer> <button id="report-ok-btn" class="report-problem-dialog-button">OK</button> </footer> </div></div>'), document.getElementsByClassName("plyr")[0].insertAdjacentElement("afterbegin", e)
                                                } catch (e) {}! function() {
                                                    try {
                                                        var e = document.querySelector('.plyr__menu__container[id*="settings"] div div[id*="home"] div[role="menu"]');
                                                        if (!e) return;
                                                        var t = document.createElement("button"),
                                                            n = window.getComputedStyle(document.body, null).getPropertyValue("--plyr-color-main");
                                                        t.textContent = mt[ut].reportModalTitle, t.classList.add("customSettingsBtn"), t.id = "report-issue-btn", t.setAttribute("data-plyr", "settings"), t.setAttribute("type", "button"), t.setAttribute("role", "menuitem"), t.setAttribute("aria-haspopup", "true"), e.appendChild(t), document.getElementById("report-issue-btn").addEventListener("click", (function() {
                                                            Vt(), document.getElementsByClassName("plyr__controls__item plyr__menu")[0].click()
                                                        })), t.onmouseover = function() {
                                                            t.style.backgroundColor = n
                                                        }, t.onmouseleave = function() {
                                                            t.style.removeProperty("background-color")
                                                        };
                                                        var o = document.createElement("button");
                                                        o.textContent = mt[ut].viewHotKeys, o.classList.add("customSettingsBtn"), o.id = "view-hot-keys-btn", o.setAttribute("data-plyr", "settings"), o.setAttribute("type", "button"), o.setAttribute("role", "menuitem"), o.setAttribute("aria-haspopup", "true"), st || e.appendChild(o), o.onmouseover = function() {
                                                            o.style.backgroundColor = n
                                                        }, o.onmouseleave = function() {
                                                            o.style.removeProperty("background-color")
                                                        }, document.getElementById("view-hot-keys-btn").addEventListener("click", (function() {
                                                            Ut()
                                                        }));
                                                        var a = document.querySelector(".plyr__menu button");
                                                        a && (a.onclick = function() {
                                                            var e = document.getElementsByClassName("plyr__controls")[0];
                                                            if (e) {
                                                                "true" === a.getAttribute("aria-expanded") ? To(e, "plyr-controls-fix-index") : So(e, "plyr-controls-fix-index");
                                                                var t = document.getElementById("context-menu-ai");
                                                                t && t.classList.contains("active") && t.classList.remove("active")
                                                            }
                                                        })
                                                    } catch (e) {}
                                                }()
                                            }(), function() {
                                                try {
                                                    var e = document.createElement("div");
                                                    e.id = "hot-keys-dialog", e.innerHTML = '\n           <div id="hot-keys-dialog-content">\n               <header>\n                   <p class="hot-keys-title">'.concat(mt[ut].viewHotKeys, "</p>\n                   <button>").concat(zt, "</button>\n               </header>\n               <ul>\n                   <li>\n                       <p>").concat(mt[ut].playPause, "</p>\n                       <p>").concat(mt[ut].spaceOrK, "</p>\n                   </li>\n                   <li>\n                       <p>").concat(mt[ut].increaseVolume, "</p>\n                       <p>").concat(mt[ut].upArrow, "</p>\n                   </li>\n                   <li>\n                       <p>").concat(mt[ut].decreaseVolume, "</p>\n                       <p>").concat(mt[ut].downArrow, "</p>\n                   </li>\n                   <li>\n                       <p>").concat(mt[ut].seekForward, "</p>\n                       <p>").concat(mt[ut].rightArrow, "</p>\n                   </li>\n                   <li>\n                       <p>").concat(mt[ut].seekBackward, "</p>\n                       <p>").concat(mt[ut].leftArrow, "</p>\n                   </li>\n                   <li>\n                       <p>").concat(mt[ut].increaseSpeed, "</p>\n                       <p>").concat(mt[ut].shiftPeriod, "</p>\n                   </li>\n                   <li>\n                       <p>").concat(mt[ut].decreaseSpeed, "</p>\n                       <p>").concat(mt[ut].shiftComma, "</p>\n                   </li>\n               </ul>\n           </div>\n       "), To(e, "disabled"), document.getElementsByClassName("plyr")[0].insertAdjacentElement("afterbegin", e)
                                                } catch (e) {}
                                            }(), t.media.load(), l(i), ["REMAINING_TIME", "CURRENT_TIME"].includes(player_configs.timeDisplayType) && "online" !== Je && !he && (Ro(Oo("current-time")).style.display = "none"), player_configs.ctas.length > 0 && p(), player_configs.saveProgress) {
                                            var c;
                                            try {
                                                c = localStorage.getItem("panda_video:" + le)
                                            } catch (e) {}
                                            player_configs.saveProgressScreen && c ? "online" !== Je && w(parseInt(c, 10)) : player_configs.mutedIndicatorIcon ? dn() : player_configs.muted && player_configs.smallMutedIcon && an()
                                        }
                                        if (player_configs.captionsFontSize && (o = Number(player_configs.captionsFontSize), a = "\n        .plyr__captions {\n            font-size: ".concat(o, "px;\n        }\n\n        @media (min-width: 480px) {\n            .plyr__captions {\n                font-size: ").concat(o > 34 ? o - 8 : o, "px;\n            }\n        }\n\n        @media (max-width: 480px) {\n            .plyr__captions {\n                font-size: ").concat(o >= 26 ? o - 12 : o, "px;\n            }\n        }\n\n        @media (max-width: 460px) {\n            .plyr__captions {\n                font-size: 14px;\n            }\n        }\n\n        @media (min-width: 768px) {\n            .plyr__captions {\n                font-size: ").concat(o + 3, "px;\n            }\n        }\n\n        @media (min-width: 1024px) {\n            .plyr:-webkit-full-screen .plyr__captions, .plyr:fullscreen .plyr__captions, .plyr__captions {\n                font-size: ").concat(o + 6, "px;\n            }\n        }\n    "), (r = document.createElement("style")).innerText = a, document.head.appendChild(r)), e.style.visibility = "visible", Te && Be) {
                                            var s = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                                                d = navigator.deviceMemory && navigator.deviceMemory <= 4,
                                                u = navigator.deviceMemory && navigator.deviceMemory <= 2,
                                                m = navigator.connection && "slow-2g" === navigator.connection.effectiveType,
                                                f = 20,
                                                y = 6e7;
                                            u || d ? (f = 5, y = 15e6) : (s || m) && (f = 10, y = 3e7), no({
                                                abrEwmaDefaultEstimate: 5e6,
                                                maxBufferLength: f,
                                                maxBufferSize: y,
                                                autoStartLoad: !0,
                                                manifestLoadingRetryDelay: 3e4,
                                                fragLoadingMaxRetry: 9999,
                                                fragLoadingTimeOut: 1e3 * xt,
                                                detectStallWithCurrentTimeMs: 1250,
                                                nudgeOnVideoHole: !0,
                                                maxBufferHole: u ? 1 : .5,
                                                xhrSetup: function(e, t) {}
                                            })
                                        }
                                        he && "online" === Je && setInterval(ao, 15e3)
                                    }));
                                    var _ = !1;

                                    function C(e) {
                                        return x.apply(this, arguments)
                                    }

                                    function x() {
                                        return (x = q(P().mark((function e(t) {
                                            var n;
                                            return P().wrap((function(e) {
                                                for (;;) switch (e.prev = e.next) {
                                                    case 0:
                                                        return n = de ? "https://hit-video.vunel.com.br:6443/icon_form.gif?v=".concat(le, "&p=").concat(pe) : "https://hit-video.pandavideo.com:6443/icon_form.gif?v=".concat(le, "&p=").concat(pe), e.next = 3, fetch(n, {
                                                            method: "POST",
                                                            body: JSON.stringify(t),
                                                            mode: "no-cors"
                                                        });
                                                    case 3:
                                                    case "end":
                                                        return e.stop()
                                                }
                                            }), e)
                                        })))).apply(this, arguments)
                                    }

                                    function T() {
                                        var e;
                                        try {
                                            e = localStorage.getItem("panda_video:" + le)
                                        } catch (e) {}
                                        var n = t.currentTime;
                                        e && 0 === n && (n = parseFloat(e));
                                        var o = tt.style.getPropertyValue("--plyr-color-main"),
                                            a = tt.style.getPropertyValue("--plyr-captions-text-color"),
                                            r = tt.style.getPropertyValue("--plyr-captions-background"),
                                            i = tt.style.getPropertyValue("--plyr-video-control-color"),
                                            c = tt.style.getPropertyValue("--plyr-menu-color"),
                                            l = _ ? t.duration : 0,
                                            s = {
                                                paused: t.paused,
                                                hasAudio: t.hasAudio,
                                                muted: t.muted,
                                                pip: t.pip,
                                                volume: t.volume,
                                                speed: t.config.speed,
                                                captions: t.captions,
                                                currentTime: n,
                                                duration: l,
                                                fullscreen: t.fullscreen.active,
                                                colors: {
                                                    primaryColor: o,
                                                    captionsColor: a,
                                                    captionsBackgroundColor: r,
                                                    controlsColor: i,
                                                    menuColor: c
                                                }
                                            };
                                        window.parent.postMessage({
                                            message: "panda_allData",
                                            video: Z.searchParams.get("v"),
                                            playerData: JSON.parse(JSON.stringify(s))
                                        }, "*")
                                    }
                                    t.on("loadedmetadata", (function(e) {
                                        var n;
                                        if (xo(), Me && (null === (n = window.player_configs) || void 0 === n || null === (n = n.subtitles) || void 0 === n ? void 0 : n.length) > 0) setTimeout((function() {
                                            var e, n = B(t.media.textTracks);
                                            try {
                                                var o = function() {
                                                    var t = e.value,
                                                        n = "pt" == t.language ? "pt-BR" : t.language,
                                                        o = "".concat(Q, "/").concat(pe, "/").concat(le, "/").concat(n, ".vtt");
                                                    fetch(o).then((function(e) {
                                                        return e.text()
                                                    })).then((function(e) {
                                                        t.cues && 0 !== t.cues.length || Tn(e, t)
                                                    }))
                                                };
                                                for (n.s(); !(e = n.n()).done;) o()
                                            } catch (e) {
                                                n.e(e)
                                            } finally {
                                                n.f()
                                            }
                                        }), 300);
                                        else if (Me) {
                                            Mo();
                                            var o = document.querySelector("button[data-plyr='captions']");
                                            o && (o.style.display = "none")
                                        }
                                        _ = !0
                                    })), o.forEach((function(e) {
                                        t.on(e, T)
                                    })), window.onmessage = function(e) {
                                        var n = e.data,
                                            o = document.querySelector(":root");
                                        if ("setParentWindowUrl" === n.type && (te = n.parameter, p({
                                                reload: !0
                                            })), "currentTime" !== n.type) {
                                            if ("muted_indicator_play" === n.type && on(), "cta_play" === n.type && t.play().catch((function() {})), "volume" === n.type) return t.volume = n.parameter, void(!rt && n.parameter > 0 && _o({}));
                                            if ("speed" !== n.type)
                                                if ("send_form" !== n.type)
                                                    if ("play_toggle" !== n.type) {
                                                        if ("colors" === n.type) {
                                                            var a = n.parameter.colors;
                                                            return a.primaryColor && o.style.setProperty("--plyr-color-main", a.primaryColor), a.captionsColor && o.style.setProperty("--plyr-captions-text-color", a.captionsColor), a.captionsBackgroundColor && o.style.setProperty("--plyr-captions-background", a.captionsBackgroundColor), a.controlsColor && (o.style.setProperty("--plyr-video-control-color", a.controlsColor), o.style.setProperty("--plyr-video-control-color-hover", a.controlsColor)), a.menuColor && o.style.setProperty("--plyr-menu-color", a.menuColor), a.mutedIndicatorBackgroundColor && o.style.setProperty("--muted-indicator-background", a.mutedIndicatorBackgroundColor), void(a.mutedIndicatorTextColor && o.style.setProperty("--muted-indicator-text", a.mutedIndicatorTextColor))
                                                        }
                                                        if ("ctas" === n.type) {
                                                            var r = n.parameter.ctas;
                                                            return yn(), 0 === player_configs.ctas.length ? (player_configs.ctas = r, hn(), vn(), m()) : (player_configs.ctas = r, vn(), hn()), void p()
                                                        }
                                                        if ("redirect_video" === n.type) {
                                                            var i, c = n.parameter.videoId;
                                                            if (Ce) return;
                                                            document.querySelector("body").style.backgroundColor = "#000";
                                                            var l = document.querySelector("#video-container");
                                                            return l && l.remove(), et.defaultSpeed = null === (i = t) || void 0 === i ? void 0 : i.speed, void
                                                            function(e) {
                                                                le = e;
                                                                var t = document.querySelector("div.container");
                                                                t && t.remove(), delete window.pandaLoad, delete window.pandatag, rt = !1, delete window.hls, delete window.player, ot = !1, delete window.pb, window.pandaLoad = {}, $e = !0;
                                                                var n = "https://b-" + pe + $ + "/" + e + "/playlist.m3u8",
                                                                    o = '\n    <div class="container redirect-loading" id="video-container">\n     '.concat(we ? "" : '<video controls crossorigin preload="auto" autoplay muted playsinline ><source type="application/x-mpegURL" src="'.concat(n, '" ></video>'), '\n            \x3c!-- Loading indicator --\x3e\n            <div id="error-indicator" class="disabled">\n            </div>\n            <div class="loading-icon disabled">\n                <svg x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">\n                    <path fill="#9e9e9e"\n                        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">\n                        <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s"\n                            from="0 50 50" to="360 50 50" repeatCount="indefinite" />\n                    </path>\n                </svg>\n            </div>\n            \n            \x3c!-- Live --\x3e\n            <div class="live-offline-badge disabled">\n\n                <div id="live-title-text">Waiting for the Live to start...</div>\n                <div class="live-subtitle-text">Aguardando inicio da Live...</div>\n                <div class="live-subtitle-text">Esperando el inicio del Live...</div>\n            </div>\n            <div class="live-thumb disabled">\n                <img src="#" alt="Live Offline">\n            </div>\n        </div>\n    '),
                                                                    a = document.getElementsByTagName("body")[0],
                                                                    r = (new DOMParser).parseFromString(o, "text/html").body.firstChild;
                                                                if (a.appendChild(r), we) {
                                                                    var i = (new DOMParser).parseFromString('<video controls crossorigin preload="auto" autoplay muted playsinline ><source type="application/x-mpegURL" src="'.concat(n, '"></video>'), "text/html").body.firstChild,
                                                                        c = document.getElementById("video-container");
                                                                    c.insertBefore(i, c.getElementsByTagName("div")[0])
                                                                }
                                                                window.pandaLoad.videoHtmlLoaded = !0, jt(), Zn()
                                                            }(c)
                                                        }
                                                        if ("remove_cta" === n.type) {
                                                            var s = n.parameter,
                                                                d = document.getElementById(s);
                                                            player_configs.ctas = player_configs.ctas.map((function(e) {
                                                                return e.id !== s ? e : I(I({}, e), {}, {
                                                                    removed: !0
                                                                })
                                                            })), d && d.remove(), t.play().catch((function() {})), !0 === (null == n ? void 0 : n.endPause) && t.pause()
                                                        }
                                                        if ("custom_muted_indicator" === n.type && (player_configs.customMutedIndicatorData = n.parameter, player_configs.mutedIndicatorAnimation = "custom", sn()), "disable_control" === n.type) {
                                                            var f = n.parameter;
                                                            ("play" === f ? document.querySelector('[data-plyr="play"]:not(.plyr__control--overlaid') : "play-large" === f ? document.querySelector('[data-plyr="play"].plyr__control--overlaid') : document.querySelector('[data-plyr="'.concat(f, '"]'))).style.display = "none"
                                                        }
                                                        if ("enable_control" === n.type) {
                                                            var y = n.parameter;
                                                            "play" === y ? document.querySelector('[data-plyr="play"]:not(.plyr__control--overlaid').style.display = "" : "play-large" === y ? document.querySelector('[data-plyr="play"].plyr__control--overlaid').style.display = "flex" : document.querySelector('[data-plyr="'.concat(y, '"]')).style.display = ""
                                                        }
                                                        if ("enable_all_controls" === n.type) {
                                                            var h = document.querySelector('[data-plyr="play"].plyr__control--overlaid');
                                                            h && (h.style.display = "flex");
                                                            var v = document.querySelector(".plyr__controls");
                                                            v && So(v, "disabled");
                                                            var g = document.getElementById("wrapper-progress");
                                                            g && So(g, "disabled")
                                                        }
                                                        if ("disable_all_controls" === n.type) {
                                                            var b = document.querySelector('[data-plyr="play"].plyr__control--overlaid');
                                                            b && (b.style.display = "none");
                                                            var w = document.querySelector(".plyr__controls");
                                                            w && To(w, "disabled")
                                                        }
                                                        if ("bookMarks" === n.type) {
                                                            var _ = n.parameter.bookMarks;
                                                            return player_configs.bookMarks = _, void bn(!0)
                                                        }
                                                        if ("fullscreen.toggle" !== n.type)
                                                            if ("fullscreen.exit" !== n.type)
                                                                if ("enable_caption_preview" === n.type && Lo(n.parameter), "set_caption_preview" === n.type && Io(n.parameter), "disable_caption_preview" === n.type && function() {
                                                                        var e = document.querySelector(".plyr__captions"),
                                                                            t = document.querySelector("#caption-preview");
                                                                        e.style.display = "none";
                                                                        try {
                                                                            e.removeChild(t)
                                                                        } catch (e) {}
                                                                    }(), "run_internal_methods" !== n.type) null != n.parameter ? t[n.type] && t[n.type](n.parameter) : t[n.type] && t[n.type]();
                                                                else {
                                                                    if (!Ce) return;
                                                                    var k = new Function("return " + n.function)(),
                                                                        x = n.parameter;
                                                                    x ? k(x) : k()
                                                                }
                                                        else t.fullscreen.exit();
                                                        else t.fullscreen.toggle()
                                                    } else t.paused ? t.play().catch((function() {})) : t.pause();
                                            else C(n.parameter);
                                            else t.speed = n.parameter
                                        } else -1 === n.parameter ? u(t.duration - 2) : u(n.parameter)
                                    }
                                }()
                        })), pandatag("playerLoaded", !0)
                    }

                    function a(e) {
                        tn(), document.querySelector(".panda-muted-indicator-item") || player_configs.mutedIndicatorIcon ? (on(), t.on("controlsshown", (function() {
                            rt || on()
                        }))) : (t.volume = 1, t.play().catch((function(e) {
                            t.muted = !0, t.play()
                        }))), Bt.forEach((function(e) {
                            window.removeEventListener(e, a)
                        }))
                    }(function(e) {
                        return lo.apply(this, arguments)
                    })(n).then((function(e) {
                        if (e) {
                            var t = Math.ceil(e.duration / 2);
                            if (e.block_download && Be && (ce = !0, document.querySelector("video").getElementsByTagName("source")[0].src += n.includes("?") ? "&" : "?token=" + co()), Me && window.player_configs && window.player_configs.initQuality && 0 !== window.player_configs.initQuality) {
                                var a = document.querySelector("video");
                                a.getElementsByTagName("source")[0].src.includes("".concat(window.player_configs.initQuality, "p")) || (a.getElementsByTagName("source")[0].src = "https://b-".concat(pe).concat($, "/").concat(le, "/").concat(window.player_configs.initQuality, "p/video.m3u8"))
                            }
                            for (var r = [], i = 0; i < t; i += 36) r.push("https://b-" + pe + $ + "/" + le + "/seek/_" + r.length + ".jpg");
                            window.player_configs.showPreviewThumbs && !he && (qt.thumbnail = {
                                enabled: !0,
                                pic_num: t,
                                width: 300,
                                height: 168,
                                col: 6,
                                row: 6,
                                offsetX: 0,
                                offsetY: 0,
                                urls: r
                            }), Et = e.m3u8Qualities.sort((function(e, t) {
                                return t - e
                            })).map((function(e) {
                                return {
                                    label: "".concat(e, "p")
                                }
                            })), e.m3u8Qualities.length > 1 ? o([0].concat(S(e.m3u8Qualities.sort((function(e, t) {
                                return t - e
                            }))))) : o(e.m3u8Qualities)
                        }
                    })).catch((function(e) {
                        console.error("Error:", e), ++De <= 3 ? setTimeout((function() {
                            bo()
                        }), 100) : o()
                    })).finally((function() {
                        setTimeout((function() {
                            Ho()
                        }), 15e3)
                    }))
                }

                function wo(e) {
                    var t = e.force,
                        n = e.time;
                    if (window.player) {
                        var o = parseInt(window.player.currentTime, 10);
                        be && (void 0 !== n && (o = n), (t || !player.muted && rt && !player.paused && !Ce && "online" !== Je) && (navigator.sendBeacon(lt + "/icon.gif?type=check&v=" + le + "&u=" + Ht + "&p=" + pe + "&current_time=" + o + "&referrer=" + encodeURIComponent(Ot) + "&visibily=" + !document[H] + V() + z()), ie = o))
                    }
                }

                function _o(e) {
                    var t = e.mutedIndicator;
                    if (!Ce && !ge && be) {
                        try {
                            navigator.sendBeacon(lt + "/icon.gif?type=play&v=" + le + "&u=" + Ht + "&p=" + pe + "&referrer=" + encodeURIComponent(Ot) + "&visibily=" + !document[H] + V() + z())
                        } catch (e) {}
                        try {
                            gtag("event", "play", {
                                video_id: le,
                                library_id: "b-" + pe
                            })
                        } catch (e) {}
                        try {
                            fbq("track", "play", {
                                video_id: le,
                                library_id: "b-" + pe
                            })
                        } catch (e) {}
                        var n, o = player_configs.customPixels.filter((function(e) {
                                return "play" === e.conditionType
                            })),
                            a = B(o);
                        try {
                            for (a.s(); !(n = a.n()).done;) {
                                var r = n.value,
                                    i = new Function(r.script);
                                try {
                                    i()
                                } catch (e) {}
                            }
                        } catch (e) {
                            a.e(e)
                        } finally {
                            a.f()
                        }
                        wo({
                            force: !0,
                            time: t ? 0 : void 0
                        }), ge = !0
                    }
                }

                function Co() {
                    var e, t = JSON.parse(localStorage.getItem("plyr")),
                        n = Et.find((function(e) {
                            return e.label == "".concat(t.quality, "p")
                        })) || Et[0],
                        o = document.querySelector("video"),
                        a = o.getElementsByTagName("source")[0].src,
                        r = Number(window.player.currentTime);
                    o.removeAttribute("src"), o.load();
                    var i = le,
                        c = a.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
                    c && (i = c[0]);
                    var l = "https://b-".concat(pe).concat($, "/").concat(i, "/").concat(n.label, "/video.m3u8");
                    o.getElementsByTagName("source")[0].src = l, o.load(), o.onloadedmetadata = function() {
                        o.currentTime = localStorage.getItem("panda_video:".concat(le)) || r || window.player.currentTime || 0, o.playbackRate = window.player.playbackRate || 1, o.volume = o.volume, o.paused || o.play()
                    }, (null === (e = window.player_configs) || void 0 === e || null === (e = e.subtitles) || void 0 === e ? void 0 : e.length) > 0 && setTimeout((function() {
                        var e, t = player.media,
                            n = Array.from(t.textTracks).map((function(e) {
                                return e.language
                            })),
                            o = B(window.player_configs.subtitles);
                        try {
                            var a = function() {
                                var o = e.value,
                                    a = "pt" === o.srclang ? "pt-BR" : o.srclang;
                                if (!n.includes(a)) {
                                    var r = "".concat(Q, "/").concat(pe, "/").concat(le, "/").concat(a, ".vtt"),
                                        i = document.createElement("track");
                                    i.kind = "subtitles", i.label = o.label || a, i.srclang = "pt-BR" == a ? "pt" : o.srclang, i.src = r, i.default = !1, t.appendChild(i), i.addEventListener("load", (function() {
                                        var e = Array.from(t.textTracks).find((function(e) {
                                            return e.language === a
                                        }));
                                        !e || e.cues && 0 !== e.cues.length || fetch(r).then((function(e) {
                                            return e.text()
                                        })).then((function(t) {
                                            return Tn(t, e)
                                        })).then((function() {
                                            var e = Ro(Oo("captions"));
                                            e.click(), e.click()
                                        }))
                                    }))
                                }
                            };
                            for (o.s(); !(e = o.n()).done;) a()
                        } catch (e) {
                            o.e(e)
                        } finally {
                            o.f()
                        }
                    }))
                }

                function ko() {
                    var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    if (null !== (e = window.hls) && void 0 !== e && null !== (e = e.levels) && void 0 !== e && e.length) {
                        var n = document.getElementById("video-container");
                        if (n) {
                            var o = Array.from(window.hls.levels).sort((function(e, t) {
                                    return t.height - e.height
                                }))[0] || {
                                    height: 0,
                                    width: 0
                                },
                                a = o.height,
                                r = o.width,
                                i = n.clientHeight,
                                c = n.clientWidth,
                                l = !(!document.fullscreenElement && !document.webkitFullscreenElement),
                                s = document.querySelector("video"),
                                d = document.querySelector(".plyr__poster");
                            null == d || d.style.setProperty("background-size", "cover", "important"), ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"].forEach((function(e) {
                                document.removeEventListener(e, ko), document.addEventListener(e, ko)
                            }));
                            var u = Math.floor(c / i * 1e4),
                                p = Math.floor(r / a * 1e4);
                            Math.abs(u - p) < 100 && !l ? s && (s.style.objectFit = "fill") : (s && (s.style.objectFit = ""), null == d || d.style.removeProperty("background-size")), t < 5 && setTimeout((function() {
                                return ko(t + 1)
                            }), 100)
                        }
                    }
                }

                function xo(e) {
                    if (document.getElementById("video-container")) {
                        var t = document.querySelector(".live-chat-container");
                        t && !t.classList.contains("disabled") && (window.innerWidth < 830 || Pn())
                    }
                }

                function Eo(e, t) {
                    return !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
                }

                function To(e, t) {
                    e && (Eo(e, t) || (e.className += " " + t))
                }

                function So(e, t) {
                    if (e && Eo(e, t)) {
                        var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                        e.className = e.className.replace(n, " ")
                    }
                }

                function Lo(e) {
                    var t = e.backgroundColor,
                        n = e.fontSize,
                        o = e.textColor,
                        a = document.querySelector("#video-container"),
                        r = document.querySelector(".plyr__captions");
                    if (!r) {
                        var i = document.createElement("div");
                        i.classList.add("plyr__captions"), i.setAttribute("dir", "auto"), a.appendChild(i), r = document.querySelector(".plyr__captions")
                    }
                    if (!document.querySelector("#caption-preview")) {
                        var c = document.createElement("span");
                        c.innerText = "".concat(mt[ut].captionPreview), c.classList.add("plyr__caption"), c.id = "caption-preview", r.appendChild(c)
                    }
                    r.style.display = "block", r.style.fontSize = n, tt.style.setProperty("--plyr-captions-background", t), tt.style.setProperty("--plyr-captions-text-color", o)
                }

                function Io(e) {
                    var t = e.backgroundColor,
                        n = e.fontSize,
                        o = e.textColor;
                    document.querySelector(".plyr__captions").style.fontSize = n, tt.style.setProperty("--plyr-captions-background", t), tt.style.setProperty("--plyr-captions-text-color", o)
                }

                function Mo() {
                    var e = document.querySelectorAll('[data-plyr="settings"].plyr__control.plyr__control--forward');
                    e && e.forEach((function(e) {
                        var t = e.querySelector("span");
                        t && /Legendas|Subtítulos|Subtitles/i.test(t.innerHTML) && (e.style.display = "none")
                    }))
                }

                function Po(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        a = new Map(t.map((function(e, t) {
                            return [e, t]
                        }))),
                        r = o ? e.filter((function(e) {
                            return a.has(e)
                        })) : e;
                    return r.sort((function(e, t) {
                        var o = e,
                            r = t;
                        return n && (o = e.control_name, r = t.control_name), (a.has(o) ? a.get(o) : 1 / 0) - (a.has(r) ? a.get(r) : 1 / 0)
                    })), r
                }

                function Ao() {
                    var e = Ro(Oo("pip"));
                    if (e) {
                        var t = e.cloneNode(!0);
                        e.style.cssText = "\n            display: none !important;\n        ", t.addEventListener("click", (function() {
                            e.click()
                        })), At.push({
                            control_name: "pip",
                            element: t
                        })
                    }
                }

                function qo() {
                    var e = S(player_configs.controls),
                        t = At.map((function(e) {
                            return e.control_name
                        })),
                        n = S(new Set(e.concat(t))),
                        o = n.filter((function(e) {
                            return It.includes(e)
                        })),
                        a = ["progress", "play-large"];
                    we || a.push("airplay"), we && Me && a.push("pip");
                    var r = n.filter((function(e) {
                            return Mt.includes(e) && !a.includes(e)
                        })),
                        i = r.length >= 7,
                        c = !1;
                    try {
                        Ro(".panda-branding-link") && (c = !0)
                    } catch (e) {}
                    return {
                        built_in_enabled_controls: e,
                        custom_enabled_controls: t,
                        final_controls_list: n,
                        primary_enabled_controls: o,
                        secondary_enabled_controls: r,
                        custom_controls_menu_required: i,
                        has_panda_branding: c
                    }
                }

                function Bo(e, t, n) {
                    var o = e.control_name,
                        a = e.element,
                        r = function(e) {
                            var t, n = qo(),
                                o = function() {
                                    return {
                                        position: "afterend",
                                        selector: n.final_controls_list.includes("captions") ? Oo("captions") : Oo("spacer")
                                    }
                                },
                                a = function() {
                                    return St && Pt < 5 ? {
                                        position: "beforebegin",
                                        selector: ".plyr__controls__item.plyr__custom-controls-menu"
                                    } : St ? {
                                        position: "beforeend",
                                        selector: ".plyr__custom-controls-menu-content",
                                        menu_item: !0
                                    } : n.has_panda_branding ? {
                                        position: "beforebegin",
                                        selector: Oo("branding")
                                    } : {}
                                };
                            return {
                                "ai-assistant-chat": o(),
                                "panda-ai": (t = "afterend", n.final_controls_list.includes("ai-assistant-chat") ? {
                                    position: t,
                                    selector: Oo("ai-assistant-chat")
                                } : n.final_controls_list.includes("captions") ? {
                                    position: t,
                                    selector: Oo("captions")
                                } : {
                                    position: t,
                                    selector: Oo("spacer")
                                }),
                                "live-chat": o(),
                                "download-offline": a(),
                                bookmarks: a(),
                                "smart-search": a(),
                                cast: a(),
                                pip: a()
                            }[e]
                        }(o),
                        i = r.position,
                        c = r.selector,
                        l = r.menu_item;
                    if (n && "bookmarks" === o) {
                        var s = document.querySelector("#bookmarks-container"),
                            d = !!s.closest(".plyr__custom-controls-menu-content");
                        if (d) {
                            var u = document.querySelector(".panda-bookmarks-list-wrapper");
                            s.parentNode.remove(), u.remove()
                        }
                        if (!d) return s.parentNode.replaceChild(a, s)
                    }
                    if (!c) return t.appendChild(a), No(o);
                    var p = {
                        "download-offline": mt[ut].download_button,
                        airplay: "Airplay",
                        bookmarks: mt[ut].chapters,
                        "smart-search": mt[ut].smart_search_placeholder,
                        cast: mt[ut].cast,
                        pip: mt[ut].pip
                    };
                    l && (a = function(e, t) {
                        var n = document.createElement("span");
                        if (n.innerText = t, "BUTTON" !== e.tagName) {
                            var o = document.createElement("button");
                            if (o.classList.add("plyr__control", "plyr__controls__item"), e.id.includes("bookmarks-container")) {
                                n.classList.add("custom-controls-menu-bookmarks"), e.querySelector(".panda-bookmarks-button");
                                var a = e.querySelector(".panda-bookmarks-list-wrapper"),
                                    r = Ro(".plyr__custom-controls-menu-content"),
                                    i = a.cloneNode(!0);
                                a.remove(), i.querySelector(".panda-bookmarks-list").remove(), i.classList.add("bookmarks_inside_menu_wrapper");
                                var c = document.createElement("ul");
                                To(c, "panda-bookmarks-list"), player_configs.bookMarks.sort((function(e, t) {
                                    return e.time - t.time
                                })).forEach((function(e, t) {
                                    var n = document.createElement("li"),
                                        o = document.createElement("span"),
                                        a = "index" === window.player_configs.bookmarksLabel ? t + 1 : gn(e.time);
                                    o.innerHTML = "<strong>" + a + "</strong> " + e.title, n.appendChild(o), n.onclick = function() {
                                        window.postMessage({
                                            type: "currentTime",
                                            parameter: e.time
                                        }, "*"), window.postMessage({
                                            type: "play"
                                        }, "*"), To(i, "disabled")
                                    }, c.appendChild(n)
                                })), i.appendChild(c), r.parentElement.insertAdjacentElement("beforeend", i), o.addEventListener("click", (function(e) {
                                    e.stopPropagation(), i.classList.contains("disabled") ? (r.classList.toggle("open", !1), So(i, "disabled")) : (r.classList.toggle("open", !0), To(i, "disabled"))
                                }))
                            }
                            return o.appendChild(e), o.appendChild(n), o
                        }
                        return e.appendChild(n), e
                    }(a, p[o])), Ro(c).insertAdjacentElement(i, a), No(o)
                }

                function No(e) {
                    var t, n;
                    "live-chat" === e && window.addEventListener("message", (function(e) {
                        var t = e.data;
                        if ("panda_newLiveChatMessage" === t || "panda_closeLiveChat" === t) {
                            var n = document.querySelector(".live-chat-container");
                            "panda_newLiveChatMessage" === t ? n.classList.contains("disabled") && An("add") : "panda_closeLiveChat" === t && (n.style.height = "0px", n.classList.add("disabled"))
                        }
                    })), "cast" === e && function() {
                        var e = new cast.framework.RemotePlayer;
                        new cast.framework.RemotePlayerController(e).addEventListener(cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, (function(e) {
                            if (e.value) {
                                wt = !0;
                                var t = document.getElementsByClassName("chromecast-btn");
                                t && (t[0].innerHTML = '<svg viewBox="100 -900 800 800"><path d="M741-300H582q-5-16-10-32.5T562-360h119v-240H364q-29-19-60.874-33.909Q271.252-648.818 237-660h504v360ZM480-480ZM81-160v-104q41.667 0 70.833 30.333Q181-203.333 181-160H81Zm200 0q0-84.66-58-144.33Q165-364 81-364v-60q108.643 0 184.321 77.5Q341-269 341-160h-60Zm160 0q0-75-28-141.5t-77-116q-49-49.5-114.5-78T81-524v-60q87 0 163.5 33.5t133.5 91q57 57.5 90 135T501-160h-60Zm380 0H601q0-15-1-30t-3-30h224v-520H141v60q-15-2-30-3t-30-1v-56q0-24.75 17.625-42.375T141-800h680q24.75 0 42.375 17.625T881-740v520q0 24.75-17.625 42.375T821-160Z" fill="'.concat(player_configs.controlsColor, '" /></svg>')), zn()
                            }
                        }))
                    }(), "smart-search" === e && ((t = document.createElement("script")).src = "https://cdn.jsdelivr.net/npm/fuse.js@7.0.0", document.head.appendChild(t)), "download-offline" === e && function() {
                        var e = mt[ut].watchOfflineModal,
                            t = !1;
                        if ("undefined" != typeof navigator && navigator.userAgentData) t = navigator.userAgentData.mobile || !1;
                        else {
                            var n = navigator.userAgent || navigator.vendor || window.opera;
                            t = /android|bb\d+|meego.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(n)
                        }!t && /Macintosh/i.test(navigator.userAgent) && "ontouchend" in document && (t = !0);
                        var o = document.createElement("div");
                        o.id = "modalOverlay", o.style.cssText = "\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        display: none;\n        align-items: center;\n        justify-content: center;\n        z-index: 1000;\n        text-align: center;\n    ", o.innerHTML = '\n      <div id="modalContent" class="modal-content">\n        <div class="modal-header">\n            <span class="modal-title">'.concat(e.title, '</span>\n\n            <div class="modal-container-buttons">\n                <button class="modal-btn-container-learn-more" id="learnMore">\n                    <span class="modal-btn-learn-more" id="learnMoreSpan"></span>\n                </button>\n                <button class="modal-btn-container" id="closeBtn">\n                    <span class="modal-btn" id="closeBtnSpan"></span>\n                </button>\n            </div>\n        </div>\n        <div class="modal-body">\n            <div class="modal-items-container">\n                <div class="modal-content-text">\n                    <h3>').concat(e.subtitle, "</h3>\n                    <p>\n                        ").concat(t ? e.paragraphMobile : e.paragraph, '\n                    </p>\n                </div>\n\n                <div class="modal-subcontent">\n                    <button class="modal-body-button" id="clickHere">').concat(e.btnText, '</button>\n                </div>\n            </div>\n            <div class="flex-column watch-offline-qrcode">\n                <img alt="QR Code" class="modal-qr-code" id="qrcode">\n            </div>\n            <div class="flex-column watch-offline-loading">\n                <div id="watch-offline-loading"></div>\n            </div>\n        </div>\n      </div>\n    ');
                        var a = document.createElement("style");
                        a.type = "text/css", a.innerHTML = "\n      .modal-content {\n          background-color: #1B1B20;\n          opacity: 0.91;\n          padding: 16px;\n          border-radius: 8px;\n          display: ".concat(t ? "flex" : "inline-block", ";\n          position: relative;\n          width: ").concat(t ? "100%" : "500px", ";\n          height: ").concat(t ? "100%" : "auto", ";\n          flex-direction: ").concat(t ? "column" : "row", ";\n      }\n\n      .modal-subcontent {\n          display: flex;\n          flex-direction: column;\n          justify-content: space-between;\n      }\n\n      .modal-items-container {\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          align-items: right;\n      }\n    \n      .modal-container-buttons {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        gap: 8px;\n      }\n\n      .modal-header {\n          display: flex;\n          justify-content: space-between;\n          align-items: center;\n          margin-bottom: 12px;\n          margin-top: ").concat(t ? "16px" : "0", ";\n      }\n\n      .modal-title {\n          font-size: 12px;\n          font-weight: 500;\n          color: #FFFFFF;\n          font-family: 'Rubik', sans-serif;\n          text-transform: uppercase;\n      }\n\n      .modal-btn-container-learn-more {\n          background: #FFFFFF;\n          border: none;\n          border-radius: 8px;\n          cursor: pointer;\n          padding: 7px;\n          align-items: center;\n          justify-content: center;\n      }\n\n       .modal-btn-container {\n          width: 32px;\n          height: 32px;\n          background: #FFFFFF;\n          border: none;\n          border-radius: 8px;\n          cursor: pointer;\n          padding: 10px;\n          align-items: center;\n          justify-content: center;\n        }\n\n      .modal-btn {\n          background: none;\n          border: none;\n          font-size: 12px;\n          font-weight: 700;\n          color: #636578;\n          display: flex;\n        }\n      \n        .modal-btn-learn-more {\n          background: none;\n          border: none;\n          font-size: 16px;\n          font-weight: 700;\n          color: #636578;\n          display: flex;\n        }\n\n      .modal-body {\n          display: flex;\n          flex: ").concat(t ? "1" : "auto", ";\n          flex-direction: row;\n          font-size: 14px;\n          color: #FFFFFF;\n          font-family: 'Rubik', sans-serif;\n          justify-content: ").concat(t ? "center" : "space-between", ";\n      }\n\n      .modal-body h3 {\n          font-size: 18px;\n          font-weight: 500;\n          line-height: 21.6px;\n          align-self: stretch;\n          text-align: ").concat(t ? "center" : "start", ";\n          color: #FFFFFF;\n          margin: 0;\n          font-family: 'Rubik', sans-serif;\n          width: 200px;\n      }\n\n      .modal-body a {\n          color: #697AF2;\n          text-decoration: none;\n          font-family: 'Rubik', sans-serif;\n      }\n\n      .modal-body-button {\n          display: ").concat(t ? "block" : "none", ";\n          background: #697AF2;\n          border: none;\n          color: #FFFFFF;\n          border-radius: 8px;\n          align-items: center;\n          text-decoration: none;\n          font-family: 'Rubik', sans-serif;\n          padding: 10px 16px;\n      }\n\n      .modal-body p {\n          font-size: 14px;\n          font-weight: 400;\n          line-height: 21px;\n          align-self: stretch;\n          text-align: ").concat(t ? "center" : "start", ";\n          color: #D0D1D9;\n          margin: 0;\n          font-family: 'Rubik', sans-serif;\n          width: 200px;\n          padding-bottom: 8px;\n          padding-top: 8px;\n      }\n\n      .modal-body .modal-qr-code {\n          width: 200px;\n          height: 200px;\n          display: ").concat(t ? "none" : "block", ";\n          border-radius: 8px;\n          margin-left: auto;\n          margin-right: auto;\n      }\n      \n      .flex-column {\n          display: flex;\n          flex-direction: column;\n      }\n\n      #watch-offline-loading {\n          display: ").concat(t ? "none" : "inline-block", ";\n          width: 100px;\n          height: 100px;\n          border: 9px solid rgba(255,255,255,.3);\n          border-radius: 50%;\n          border-top-color: #fff;\n          animation: spin 1s ease-in-out infinite;\n          -webkit-animation: spin 1s ease-in-out infinite;\n      }\n\n      .watch-offline-loading {\n          display: ").concat(t ? "none" : "flex", ";\n          justify-content: center;\n          align-items: center;\n          width: 200px;\n          height: 200px;\n      }\n\n      @keyframes spin {\n          to { -webkit-transform: rotate(360deg); }\n      }\n      @-webkit-keyframes spin {\n          to { -webkit-transform: rotate(360deg); }\n      }\n\n      @media (max-width: 768px) {\n        .modal-content {\n            display: flex;\n            flex-direction: column;\n            width: 100%;\n            height: 100%;\n            border-radius: 0px;\n        }\n\n        .modal-header {\n            margin-top: 16px;\n        }\n\n        .modal-body {\n            flex: 1;\n            align-items: center;\n            justify-content: center;\n            gap: 24px;\n        }\n\n        .modal-body h3 {\n            width: 306px;\n            text-align: center;\n        }\n\n        .modal-body p {\n            width: 306px;\n            text-align: center;\n        }\n\n        .modal-items-container {\n          align-items: center;\n        }\n    }\n\n   @media (max-width: 425px) {\n        .modal-content {\n          width: 100%; \n          max-width: 100vw; \n          height: 100%; \n          padding: 2px; \n          box-sizing: border-box; \n          border-radius: 0px;\n        }\n\n        .modal-header {\n          margin-top: 2px;\n          margin-bottom: 2px;\n        }\n\n        .modal-body {\n          align-items: center;\n          justify-content: center;\n          width: 100%;\n          max-width: 100%;\n        }\n\n        .modal-body p {\n          padding: 0px;\n        }\n\n        .modal-btn-container {\n          width: auto;\n          height: auto;\n        }\n\n        .modal-btn-container-learn-more {\n          width: auto;\n          height: auto;\n        }\n\n        .modal-btn {\n          font-size: 10px;\n        }\n\n        .modal-btn-learn-more {\n          font-size: 10px;\n        }\n\n        .modal-body h3 {\n            width: auto;\n            font-size: 12px;\n            text-align: center;\n        }\n        \n        .modal-body p {\n            width: auto;\n            font-size: 10px;\n            text-align: center;\n        }\n\n        .modal-qr-code {\n          width: 50px;\n          height: 50px;\n        }\n\n        #watch-offline-loading {\n          width: 50px;\n          height: 50px;\n        }\n        \n        .watch-offline-loading {\n          width: auto;\n          height: auto;\n        }\n    }\n    "), document.head.appendChild(a), document.getElementsByClassName("plyr")[0].insertAdjacentElement("beforeend", o);
                        var r = document.getElementById("closeBtn"),
                            i = document.getElementById("closeBtnSpan"),
                            c = document.getElementById("learnMoreSpan");
                        i.innerHTML = '\n    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5893 1.58934C11.9148 1.2639 11.9148 0.736263 11.5893 0.410826C11.2639 0.0853888 10.7363 0.0853888 10.4108 0.410826L6.00008 4.82157L1.58934 0.410826C1.2639 0.0853888 0.736263 0.0853888 0.410826 0.410826C0.0853888 0.736263 0.0853888 1.2639 0.410826 1.58934L4.82157 6.00008L0.410826 10.4108C0.0853888 10.7363 0.0853888 11.2639 0.410826 11.5893C0.736263 11.9148 1.2639 11.9148 1.58934 11.5893L6.00008 7.17859L10.4108 11.5893C10.7363 11.9148 11.2639 11.9148 11.5893 11.5893C11.9148 11.2639 11.9148 10.7363 11.5893 10.4108L7.17859 6.00008L11.5893 1.58934Z" fill="#636578"/>\n    </svg>\n    ', c.innerHTML = '\n    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00005 1.63636C4.93319 1.63636 1.63636 4.93317 1.63636 8.99999C1.63636 13.0669 4.93319 16.3636 9.00005 16.3636C13.0668 16.3636 16.3637 13.0669 16.3637 8.99999C16.3637 4.93317 13.0668 1.63636 9.00005 1.63636ZM0 8.99999C0 4.02944 4.02944 0 9.00005 0C13.9706 0 18 4.02944 18 8.99999C18 13.9705 13.9706 18 9.00005 18C4.02944 18 0 13.9705 0 8.99999Z" fill="#636578"/>\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.19377 6.01818C8.8446 5.95829 8.48552 6.0239 8.18013 6.20339C7.87472 6.38288 7.6427 6.66466 7.52514 6.99882C7.38769 7.38956 6.9595 7.5949 6.56877 7.45744C6.17802 7.31999 5.97269 6.8918 6.11014 6.50106C6.34525 5.83273 6.8093 5.26916 7.42009 4.91019C8.0309 4.55122 8.74904 4.42 9.4473 4.53977C10.1456 4.65955 10.7789 5.02258 11.2352 5.56459C11.6914 6.10648 11.9411 6.7923 11.9401 7.50062C11.9399 8.64839 11.0888 9.40637 10.4811 9.81146C10.1544 10.0293 9.83304 10.1895 9.59634 10.2947C9.47691 10.3478 9.37629 10.3881 9.30384 10.4156C9.26748 10.4295 9.23805 10.4402 9.21663 10.4478L9.19062 10.4569L9.18234 10.4597L9.17937 10.4607L9.17829 10.4612C9.17829 10.4612 9.1773 10.4614 8.94015 9.74999L9.1773 10.4614C8.78436 10.5925 8.35962 10.3801 8.22864 9.98714C8.09773 9.59438 8.30974 9.17003 8.70219 9.03872L8.71416 9.03449C8.7257 9.03035 8.74461 9.02351 8.76982 9.01388C8.8204 8.99465 8.89561 8.96463 8.9871 8.92396C9.17226 8.84168 9.41337 8.72058 9.64908 8.56341C10.1663 8.2186 10.4402 7.8518 10.4402 7.49994V7.49882C10.4406 7.14458 10.3158 6.80159 10.0876 6.53059C9.85959 6.25959 9.54288 6.07807 9.19377 6.01818Z" fill="#636578"/>\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25014 12.75C8.25014 12.3357 8.58593 12 9.00018 12H9.00765C9.42183 12 9.75762 12.3357 9.75762 12.75C9.75762 13.1642 9.42183 13.4999 9.00765 13.4999H9.00018C8.58593 13.4999 8.25014 13.1642 8.25014 12.75Z" fill="#636578"/>\n    </svg>\n    ', document.querySelector(".plyr__download").addEventListener("click", (function() {
                                o.style.display = "flex"
                            })), r.addEventListener("click", (function() {
                                o.style.display = "none"
                            })), o.addEventListener("click", (function(e) {
                                e.target === o && (o.style.display = "none")
                            })),
                            function() {
                                var e = G + "/app/qrcode?v=" + le,
                                    t = document.querySelector(".watch-offline-qrcode");
                                t.style.display = "none";
                                var n = document.querySelector(".watch-offline-loading");
                                fetch(e, {
                                    method: "GET"
                                }).then((function(e) {
                                    if (e.ok) return e.json();
                                    throw new Error("Was not possible to fetch qr code")
                                })).then((function(e) {
                                    var o = e.base64,
                                        a = e.link,
                                        r = "pt" === ut ? "https://help.pandavideo.com/pt-br/article/como-assistir-videos-da-panda-em-modo-offline-a5zzwa/" : "https://help.pandavideo.com/en-us/article/how-to-watch-panda-videos-in-offline-mode-tnww6s/",
                                        i = document.getElementById("qrcode"),
                                        c = "data:image/png;base64,".concat(o);
                                    i.src = c, document.getElementById("learnMore").addEventListener("click", (function(e) {
                                        e.preventDefault(), Mn(r)
                                    })), document.getElementById("clickHere").addEventListener("click", (function(e) {
                                        e.preventDefault(), Mn(a)
                                    })), t.style.display = "", n.style.display = "none"
                                })).catch((function(e) {
                                    console.error("Error:", e)
                                }))
                            }()
                    }(), "ai-assistant-chat" === e && window.addEventListener("message", (function(e) {
                        var t = e.data;
                        if ("panda_newLiveChatMessage" === t || "panda_closeLiveChat" === t) {
                            var n = document.querySelector(".assist-chat-container");
                            "panda_newLiveChatMessage" === t ? n.classList.contains("disabled") && An("add") : "panda_closeLiveChat" === t && (n.style.height = "0px", n.classList.add("disabled"))
                        }
                    })), "panda-ai" === e && ((n = document.querySelectorAll(".plyr__control.ai_button")) && n.forEach((function(e) {
                        e.addEventListener("click", qn)
                    })), document.addEventListener("click", (function(e) {
                        document.getElementById("context-menu-ai").classList.remove("active")
                    })), function() {
                        var e = document.createElement("script");
                        e.src = "https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js", e.onload = function() {
                            window.mermaid.initialize({
                                startOnLoad: !1
                            })
                        }, document.head.appendChild(e)
                    }(), function() {
                        var e = document.createElement("script");
                        e.src = "https://unpkg.com/@panzoom/panzoom@4.5.1/dist/panzoom.min.js", document.head.appendChild(e)
                    }(), function() {
                        var e = document.createElement("script");
                        e.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js", document.head.appendChild(e)
                    }())
                }

                function Oo(e) {
                    return {
                        play: '[data-plyr="play"]',
                        rewind: '[data-plyr="rewind"]',
                        "fast-forward": '[data-plyr="fast-forward"]',
                        mute: ".plyr__controls__item.plyr__volume",
                        volume: ".plyr__controls__item.plyr__volume",
                        duration: ".plyr__controls__item.plyr__time--duration.plyr__time",
                        "current-time": ".plyr__controls__item.plyr__time--current.plyr__time",
                        captions: '[data-plyr="captions"]',
                        settings: ".plyr__controls__item.plyr__menu",
                        fullscreen: '[data-plyr="fullscreen"]',
                        pip: '[data-plyr="pip"]',
                        spacer: ".plyr__controls__item.plyr__controls__spacer",
                        branding: ".panda-branding-link",
                        "panda-ai": ".panda-ai-link.plyr__control.plyr__controls__item",
                        "live-chat": ".panda-live-chat",
                        "download-offline": ".plyr__control.plyr__controls__item.plyr__download",
                        title: ".panda-title-wrapper",
                        cast: ".plyr__controls__item.plyr__control.chromecast-btn",
                        "ai-assistant-chat": ".panda_assist_chat",
                        "smart-search": ".panda-smart-search.plyr__control.plyr__controls__item",
                        bookmarks: ".panda-bookmarks-div"
                    }[e]
                }

                function Ro(e) {
                    var t = null;
                    try {
                        t = document.querySelector(e)
                    } catch (e) {}
                    return t
                }

                function Ho() {
                    var e = document.getElementById("cover-thumbnail");
                    e && (e.style.display = "none"), document.body.classList.remove("has-cover")
                }
                window.addEventListener("resize", xo), document.onkeydown = function(e) {
                        27 == (e = e || window.event).keyCode && (player_configs.playOpensFullscreen ? window.parent.postMessage({
                            message: "panda_close_window_fullscreen",
                            video: le
                        }, "*") : player_configs.playOpensFullscreenNative && window.postMessage({
                            type: "fullscreen.exit"
                        }, "*"))
                    },
                    function e() {
                        if ("hidden" === document.visibilityState) return document.addEventListener("visibilitychange", e, {
                            once: !0
                        }), void(Tt = !0);
                        Tt && (Tt = !1, window.location.reload())
                    }()
            },
            3568: e => {
                var t = null;

                function n(e, t) {
                    e.addEventListener("click", (function() {
                        t.remove(), window.pandaLoad.initPlayerLoading()
                    }))
                }
                e.exports = {
                    createUnloadedPlayerContainer: function(e) {
                        var t = document.createElement("div");
                        t.id = "video-container", t.classList.add("container"), t.classList.add("in-page-container");
                        var o = document.createElement("img");
                        o.style.cssText = "\n      object-position: center;\n      object-fit: contain;\n    ", o.src = e, o.classList.add("plyr__poster"), o.classList.add("thumbnail-blur"), o.onload = function() {
                            return o.classList.remove("thumbnail-blur")
                        };
                        var a = window.player_configs.controls.includes("play-large");
                        if (a) {
                            var r = (new DOMParser).parseFromString('<button type="button" class="plyr__control plyr__control--overlaid" data-plyr="play" aria-pressed="false" aria-label="Reproduzir" style="z-index: 10; display: flex;">\n    <svg id="plyr-play" viewBox="0 0 18 18">\n        <path d="M15.562 8.1L3.87.225c-.818-.562-1.87 0-1.87.9v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z" />\n    </svg>\n    <span class="plyr__sr-only">Reproduzir</span>\n  </button>', "text/html").body.firstChild;
                            t.appendChild(r), n(r, t)
                        }
                        a || (o.style.cursor = "pointer"), t.appendChild(o), n(o, t), document.body.appendChild(t), window.pandaLoad.applySettingsUnloadedPlayer()
                    },
                    setThumbnailUrl: function(e) {
                        var t = e.REFRESH_CONFIG,
                            n = e.EMBED_DOMAIN,
                            o = e.THUMBS_URL,
                            a = e.LIBRARY_ID,
                            r = e.VIDEO_ID;
                        return e.thumb && "" !== e.thumb ? t ? e.thumb.includes("".concat(n, "/")) ? e.thumb + "?date=" + (new Date).getTime() : o + "/" + a + "/" + e.thumb + "?date=" + (new Date).getTime() : e.thumb.includes("".concat(n, "/")) ? e.thumb : o + "/" + a + "/" + e.thumb : "https://b-" + a + n + "/" + r + "/thumbnail.jpg"
                    },
                    wireUpEvents: function() {
                        window.onmessage = function(e) {
                                var n = e.data,
                                    o = n.type,
                                    a = n.parameter;
                                "play" !== o && "play_toggle" !== o || (document.getElementById("video-container").remove(), window.pandaLoad.initPlayerLoading()), "volume" === o && (t = a)
                            },
                            function() {
                                var e = new URL(location.href).searchParams.get("v"),
                                    t = null;
                                try {
                                    t = localStorage.getItem("panda_video:" + e)
                                } catch (e) {}
                                var n = t ? Number(t) : 0;
                                (function(e, t) {
                                    window.parent.postMessage({
                                        message: "panda_ready",
                                        video: e,
                                        currentTime: t,
                                        isMutedIndicator: !!player_configs.mutedIndicatorIcon,
                                        isPreviousProgressLoaded: !1
                                    }, "*")
                                })(e, n),
                                function(e, t) {
                                    var n = null;
                                    try {
                                        var o = localStorage.getItem("plyr");
                                        o && (n = JSON.parse(o))
                                    } catch (e) {}
                                    var a = n && n.muted ? n.muted : player_configs.muted,
                                        r = n && n.volume ? n.volume : 1,
                                        i = n && n.speed ? n.speed : player_configs.defaultSpeed,
                                        c = player_configs,
                                        l = c.primaryColor,
                                        s = c.captionsColor,
                                        d = c.captionsBackgroundColor,
                                        u = c.controlsColor,
                                        p = c.menuColor,
                                        m = {
                                            paused: !0,
                                            hasAudio: !0,
                                            muted: a,
                                            pip: player_configs.controls.includes("pip"),
                                            volume: r,
                                            speed: {
                                                selected: i,
                                                options: player_configs.availableSpeeds,
                                                turbo: player_configs.defaultSpeed
                                            },
                                            captions: {
                                                active: !1,
                                                currentTrack: -1,
                                                meta: {},
                                                toggled: !1,
                                                language: "pt",
                                                languages: ["pt", "es", "en"]
                                            },
                                            currentTime: t,
                                            duration: 0,
                                            fullscreen: !1,
                                            colors: {
                                                primaryColor: l,
                                                captionsColor: s,
                                                captionsBackgroundColor: d,
                                                controlsColor: u,
                                                menuColor: p
                                            }
                                        };
                                    window.parent.postMessage({
                                        message: "panda_allData",
                                        video: e,
                                        playerData: JSON.parse(JSON.stringify(m))
                                    }, "*")
                                }(e, n)
                            }()
                    },
                    checkPlayerVolume: function() {
                        null !== t && (player.volume = t)
                    }
                }
            },
            6251: () => {
                function e(e, n) {
                    for (var o = 0; o < n.length; o++) {
                        var a = n[o];
                        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, t(a.key), a)
                    }
                }

                function t(e) {
                    var t = function(e, t) {
                        if ("object" != n(e) || !e) return e;
                        var o = e[Symbol.toPrimitive];
                        if (void 0 !== o) {
                            var a = o.call(e, "string");
                            if ("object" != n(a)) return a;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == n(t) ? t : String(t)
                }

                function n(e) {
                    return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, n(e)
                }! function(t) {
                    function o() {
                        var e, t, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                            i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        if ("number" != (t = n(e = a)) && "string" !== t || isNaN(e - parseFloat(e))) return o(null, r, i);
                        var c, l = function(e) {
                                return "0".concat(e).slice(-2)
                            },
                            s = (c = a, Math.trunc(c / 60 / 60 % 60, 10)),
                            d = function(e) {
                                return Math.trunc(e / 60 % 60, 10)
                            }(a),
                            u = function(e) {
                                return Math.trunc(e % 60, 10)
                            }(a);
                        return s = r || s > 0 ? "".concat(s, ":") : "", "".concat(i && a > 0 ? "-" : "").concat(s).concat(l(d), ":").concat(l(u))
                    }
                    var a = function() {
                        function n(e) {
                            ! function(e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, n), this.player = e, this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
                                thumb: {},
                                scrubbing: {}
                            }, this.load()
                        }
                        var a, r;
                        return a = n, r = [{
                            key: "enabled",
                            get: function() {
                                return this.player.isHTML5 && this.player.isVideo && this.player.config.thumbnail.enabled
                            }
                        }, {
                            key: "config",
                            get: function() {
                                return this.player.config.thumbnail
                            }
                        }, {
                            key: "load",
                            value: function() {
                                this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && (this.render(), this.determineContainerAutoSizing(), this.loaded = !0, this.listeners())
                            }
                        }, {
                            key: "startMove",
                            value: function(e) {
                                if (this.loaded && !(!e instanceof Event) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) {
                                    if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);
                                    else {
                                        var t = this.player.elements.progress.getBoundingClientRect(),
                                            n = 100 / t.width * (e.pageX - t.left);
                                        this.seekTime = this.player.media.duration * (n / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = o(this.seekTime)
                                    }
                                    this.showImageAtCurrentTime()
                                }
                            }
                        }, {
                            key: "endMove",
                            value: function() {
                                this.toggleThumbContainer(!1, !0)
                            }
                        }, {
                            key: "startScrubbing",
                            value: function(e) {
                                !1 !== e.button && 0 !== e.button || (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()))
                            }
                        }, {
                            key: "endScrubbing",
                            value: function() {
                                var e = this;
                                this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : this.player.media.addEventListener("timeupdate", (function() {
                                    e.mouseDown || e.toggleScrubbingContainer(!1)
                                }), {
                                    once: !0
                                })
                            }
                        }, {
                            key: "listeners",
                            value: function() {
                                var e = this,
                                    t = this.player;
                                t.on("play", (function() {
                                    e.toggleThumbContainer(!1, !0)
                                })), t.on("seeked", (function() {
                                    e.toggleThumbContainer(!1)
                                })), t.on("timeupdate", (function() {
                                    e.lastTime = e.player.media.currentTime
                                }));
                                var n = this.player.elements;
                                ["mousemove", "touchmove", "mouseleave", "click", "mousedown", "touchstart", "mouseup", "touchend"].forEach((function(e) {
                                    null != n.progress.addEventListener && n.progress.addEventListener(e, (function(n) {
                                        var o = t.thumbnails;
                                        if (o && o.loaded) switch (e) {
                                            case "mousemove":
                                            case "touchmove":
                                            case "mousedown":
                                            case "touchstart":
                                                o.startMove(n);
                                                break;
                                            case "mouseleave":
                                            case "click":
                                                o.endMove(!1, !0);
                                                break;
                                            case "mouseup":
                                            case "touchend":
                                                o.endScrubbing(n)
                                        }
                                    }))
                                }))
                            }
                        }, {
                            key: "render",
                            value: function() {
                                this.elements.thumb.container = t.createElement("div"), this.elements.thumb.container.classList.add(this.player.config.classNames.previewThumbnails.thumbContainer), this.elements.thumb.imageContainer = t.createElement("div"), this.elements.thumb.imageContainer.className = this.player.config.classNames.previewThumbnails.imageContainer, this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
                                var e = t.createElement("div");
                                e.className = this.player.config.classNames.previewThumbnails.timeContainer, this.elements.thumb.time = t.createElement("span"), this.elements.thumb.time.textContent = "00:00", e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), this.player.elements.progress instanceof Element && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = t.createElement("div"), this.elements.scrubbing.container.className = this.player.config.classNames.previewThumbnails.scrubbingContainer, this.player.elements.wrapper.appendChild(this.elements.scrubbing.container)
                            }
                        }, {
                            key: "showImageAtCurrentTime",
                            value: function() {
                                this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
                                var e = this.config,
                                    t = this.player.duration / e.pic_num,
                                    n = Math.floor(this.seekTime / t),
                                    o = Math.ceil((n + 1) / (e.col * e.row)) - 1,
                                    a = n >= 0;
                                this.mouseDown || this.toggleThumbContainer(a), a && n !== this.showingThumb && (this.showingThumb = n, this.loadImage(o))
                            }
                        }, {
                            key: "loadImage",
                            value: function() {
                                var e = this,
                                    t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                    n = this.showingThumb,
                                    o = this.config.urls[t];
                                if (this.currentImageElement && this.currentImageElement.src === o) this.showImage(this.currentImageElement, t, n, o, !1), this.currentImageElement.dataset.index = n, this.removeOldImages(this.currentImageElement);
                                else {
                                    this.loadingImage && (this.loadingImage.onload = null);
                                    var a = new Image;
                                    a.src = o, a.dataset.index = n, this.player.debug.log("Loading image: ".concat(o)), a.onload = function() {
                                        return e.showImage(a, t, n, o, !0)
                                    }, this.loadingImage = a, this.removeOldImages(a)
                                }
                            }
                        }, {
                            key: "showImage",
                            value: function(e, t, n, o) {
                                var a = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
                                this.player.debug.log("Showing thumb: ".concat(o, ". num: ").concat(n, ". qual: ").concat(t, ". newimg: ").concat(a)), this.setImageSizeAndOffset(e, n), a && (this.currentImageContainer.appendChild(e), this.currentImageElement = e, this.loadedImages.includes(o) || this.loadedImages.push(o))
                            }
                        }, {
                            key: "removeOldImages",
                            value: function(e) {
                                var t = this;
                                Array.from(this.currentImageContainer.children).forEach((function(n) {
                                    if ("img" === n.tagName.toLowerCase() && n.dataset.index !== e.dataset.index && !n.dataset.deleting) {
                                        n.dataset.deleting = !0;
                                        var o = t.currentImageContainer;
                                        setTimeout((function() {
                                            o.removeChild(n), t.player.debug.log("Removing thumb: ".concat(n.dataset.filename))
                                        }), 500)
                                    }
                                }))
                            }
                        }, {
                            key: "currentImageContainer",
                            get: function() {
                                return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer
                            }
                        }, {
                            key: "thumbAspectRatio",
                            get: function() {
                                return this.config.width / this.config.height
                            }
                        }, {
                            key: "thumbContainerHeight",
                            get: function() {
                                return this.mouseDown ? Math.floor(this.player.media.clientWidth / this.thumbAspectRatio) : Math.min(135, Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4))
                            }
                        }, {
                            key: "currentImageElement",
                            get: function() {
                                return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement
                            },
                            set: function(e) {
                                this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e
                            }
                        }, {
                            key: "toggleThumbContainer",
                            value: function() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                                    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                    n = this.player.config.classNames.previewThumbnails.thumbContainerShown;
                                this.elements.thumb.container.classList.toggle(n, e), !e && t && (this.showingThumb = null, this.showingThumbFilename = null)
                            }
                        }, {
                            key: "toggleScrubbingContainer",
                            value: function() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                                    t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
                                this.elements.scrubbing.container.classList.toggle(t, e), e || (this.showingThumb = null, this.showingThumbFilename = null)
                            }
                        }, {
                            key: "determineContainerAutoSizing",
                            value: function() {
                                this.elements.thumb.imageContainer.clientHeight > 20 && (this.sizeSpecifiedInCSS = !0)
                            }
                        }, {
                            key: "setThumbContainerSizeAndPos",
                            value: function() {
                                if (!this.sizeSpecifiedInCSS) {
                                    var e = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
                                    this.elements.thumb.imageContainer.style.height = "".concat(this.thumbContainerHeight, "px"), this.elements.thumb.imageContainer.style.width = "".concat(e, "px")
                                }
                                this.setThumbContainerPos()
                            }
                        }, {
                            key: "setThumbContainerPos",
                            value: function() {
                                var e = this.player.elements.progress.getBoundingClientRect(),
                                    t = this.player.elements.container.getBoundingClientRect(),
                                    n = this.elements.thumb.container,
                                    o = t.left - e.left + 10,
                                    a = t.right - e.left - n.clientWidth - 10,
                                    r = this.mousePosX - e.left - n.clientWidth / 2;
                                r < o && (r = o), r > a && (r = a), n.style.left = "".concat(r, "px")
                            }
                        }, {
                            key: "setScrubbingContainerSize",
                            value: function() {
                                this.elements.scrubbing.container.style.width = "".concat(this.player.media.clientWidth, "px"), this.elements.scrubbing.container.style.height = this.player.media.clientWidth / this.thumbAspectRatio + "px"
                            }
                        }, {
                            key: "setImageSizeAndOffset",
                            value: function(e, t) {
                                var n = this.config,
                                    o = t + 1 - n.col * n.row * (Math.ceil((t + 1) / (n.col * n.row)) - 1),
                                    a = Math.ceil(o / n.row) - 1,
                                    r = o - a * n.row - 1,
                                    i = this.thumbContainerHeight / n.height;
                                e.style.height = "".concat(Math.floor(e.naturalHeight * i), "px"), e.style.width = "".concat(Math.floor(e.naturalWidth * i), "px"), e.style.left = "-".concat(r * n.width * i, "px"), e.style.top = "-".concat(a * n.height * i, "px")
                            }
                        }], r && e(a.prototype, r), Object.defineProperty(a, "prototype", {
                            writable: !1
                        }), n
                    }();
                    t.addEventListener("ready", (function(e) {
                        var t = e.detail.plyr;
                        t.thumbnails = new a(t)
                    }))
                }(document)
            },
            3165: e => {
                e.exports = {
                    getSvgItem: function(e) {
                        return {
                            panda_icon: '\n    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">\n      <mask id="mask0_311_382" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="85" height="20">\n        <path d="M84.2105 0H0V20H84.2105V0Z" fill="white"/>\n      </mask>\n      <g mask="url(#mask0_311_382)">\n        <path d="M8.30815 2.19763L8.30757 2.19725L8.30594 2.19625C7.00899 1.36281 5.47152 1.37166 4.2622 1.94079C3.052 2.51033 2.10526 3.67901 2.10526 5.19764V14.8033C2.10526 16.3221 3.05214 17.4902 4.26234 18.0594C5.46699 18.6261 6.9972 18.6369 8.29099 17.8144L16.1788 13.327L16.1827 13.3248L16.1864 13.3225L16.1966 13.3158C18.4604 11.8637 18.4607 8.76554 16.1977 7.31297L16.1965 7.3122L8.30815 2.19763Z" fill="white"/>\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.50747 0.868897L8.51621 0.873999L8.52752 0.881363L17.2539 6.36718L17.3268 6.41056L17.3349 6.41841C20.2529 8.30092 20.2281 12.2682 17.2603 14.1152L17.2589 14.1161L17.2468 14.1236L17.2272 14.1358L17.2033 14.1491L8.48052 18.9605C6.8021 19.9867 4.82721 19.9667 3.27744 19.2599C1.71493 18.5473 0.4328 17.0512 0.4328 15.0655V4.74718C0.4328 2.76179 1.71458 1.26504 3.27714 0.55204C4.83517 -0.1589 6.82321 -0.175618 8.50747 0.868897ZM7.66668 2.17114C6.47926 1.43129 5.0653 1.4349 3.94679 1.94529C2.82778 2.45589 2.01175 3.46991 2.01175 4.74718V15.0655C2.01175 16.3428 2.82773 17.3561 3.9468 17.8665C5.06105 18.3747 6.46873 18.3801 7.65342 17.6499L7.66973 17.6398L16.4104 12.8186C18.3685 11.5999 18.4292 9.08754 16.5926 7.78867H16.5082L16.3363 7.62118L7.67637 2.17715L7.66668 2.17114Z" fill="white"/>\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.68952 1.4119C4.97799 0.823937 6.61436 0.815809 7.99342 1.67502L7.99521 1.6761L16.7356 7.17072L16.7367 7.17143C19.1303 8.66107 19.1299 11.8265 16.7356 13.3156L16.7242 13.3227L7.98126 18.1453C6.60484 18.9955 4.97431 18.9858 3.68962 18.4C2.40031 17.812 1.40599 16.6136 1.40599 15.0655V4.74723C1.40599 3.19923 2.4002 2.0002 3.68952 1.4119ZM4.12141 2.32667C3.11973 2.78374 2.43183 3.66672 2.43183 4.74723V15.0655C2.43183 16.1459 3.11957 17.0283 4.12131 17.4851C5.12389 17.9424 6.38768 17.9431 7.44458 17.2857L7.45605 17.2786L16.1983 12.4565C17.9453 11.3605 17.9416 9.11415 16.1872 8.02302L16.185 8.02169L7.44426 2.52687L7.44342 2.52631C6.38684 1.86846 5.12367 1.86933 4.12141 2.32667Z" fill="#232536"/>\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.49415 7.53954C7.45089 7.53954 8.22404 8.3022 8.22404 9.24015C8.22404 10.9027 6.8562 12.2475 5.16511 12.2449H1.66911V7.53954H6.49415ZM6.02747 10.4797C5.47057 10.5548 4.95759 10.172 4.88127 9.62456C4.80496 9.07702 5.19427 8.57271 5.7512 8.49769C6.3081 8.42256 6.8211 8.80543 6.89747 9.35297C6.97378 9.90041 6.58441 10.4047 6.02747 10.4797Z" fill="#232536"/>\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1015 7.53954C12.1474 7.53954 11.3742 8.3022 11.3742 9.24015C11.3742 10.9027 12.7422 12.2475 14.428 12.2449H17.0241C17.306 12.2449 17.5749 12.1357 17.774 11.9399C17.9732 11.7467 18.0843 11.4823 18.0843 11.2053V9.21482C18.0843 8.77241 17.9059 8.34538 17.5854 8.0302C17.2672 7.71497 16.8327 7.53954 16.3803 7.53954H13.1015ZM13.3227 10.397C13.8796 10.472 14.3926 10.0894 14.4689 9.5419C14.5457 8.99097 14.1564 8.48651 13.599 8.41502C13.042 8.34 12.5291 8.72272 12.4528 9.27025C12.3765 9.81779 12.7658 10.322 13.3227 10.397Z" fill="#232536"/>\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.10458 4.49538C7.36858 4.34748 7.52047 4.06195 7.48915 3.76307C7.45784 3.46425 7.25263 3.2139 6.96258 3.12082C6.19321 2.8739 5.35873 2.93764 4.63816 3.29738C3.91753 3.65707 3.372 4.28425 3.12163 5.0382L2.99642 5.41518C2.89853 5.71 2.99869 6.03097 3.24848 6.22077C3.49827 6.41056 3.83853 6.42615 4.10569 6.26051C4.84116 5.79861 5.53026 5.37 5.53026 5.37C5.53026 5.37 6.32315 4.93184 7.10458 4.49538Z" fill="#232536"/>\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4159 12.0501C10.4159 11.9491 10.3749 11.8533 10.3039 11.7822C10.2314 11.7113 10.1335 11.6714 10.031 11.6714C9.78009 11.6714 9.45188 11.6714 9.20109 11.6714C9.09841 11.6714 9.00067 11.7113 8.92814 11.7822C8.85546 11.8533 8.81604 11.9491 8.81604 12.0501C8.81604 12.1497 8.85709 12.2469 8.92814 12.318C9.00067 12.3889 9.09841 12.4288 9.20109 12.4288C9.45188 12.4288 9.78009 12.4288 10.031 12.4288C10.1335 12.4288 10.2314 12.3889 10.3039 12.318C10.3749 12.2469 10.4159 12.151 10.4159 12.0501Z" fill="#232536"/>\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.85169 11.7079C8.94432 11.6174 9.06948 11.5663 9.20111 11.5663H10.031C10.1624 11.5663 10.2878 11.6174 10.3804 11.7079L10.3813 11.7089C10.4715 11.7992 10.5239 11.9213 10.5239 12.0501C10.5239 12.1789 10.4715 12.3009 10.3813 12.3913L10.3804 12.3922C10.2878 12.4828 10.1624 12.5339 10.031 12.5339H9.20111C9.06948 12.5339 8.94432 12.4828 8.85169 12.3922L8.85085 12.3914C8.76038 12.3009 8.70811 12.1774 8.70811 12.0501C8.70811 11.9223 8.75822 11.7994 8.85169 11.7079ZM9.20111 11.7766C9.12732 11.7766 9.05706 11.8051 9.00464 11.8564C8.95275 11.9071 8.92401 11.976 8.92401 12.0501C8.92401 12.1218 8.95369 12.1926 9.00506 12.2442C9.05743 12.2952 9.12754 12.3236 9.20111 12.3236H10.031C10.1044 12.3236 10.1747 12.2952 10.2271 12.2442C10.2784 12.1925 10.308 12.123 10.308 12.0501C10.308 11.9772 10.2784 11.9077 10.2271 11.8559C10.1747 11.805 10.1044 11.7766 10.031 11.7766H9.20111Z" fill="#232536"/>\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.45615 13.2358C7.45615 13.2358 7.69731 13.5113 8.07678 13.6751C8.3081 13.7749 8.58604 13.8338 8.89073 13.7857C9.27641 13.7244 9.55425 13.5535 9.74894 13.3296C9.95815 13.0878 10.0697 12.7773 10.0855 12.45C10.0977 12.196 9.89825 11.9794 9.63988 11.9674C9.38162 11.9553 9.16136 12.1515 9.1491 12.4067C9.14299 12.5257 9.11236 12.6437 9.03515 12.7316C8.97036 12.8061 8.87125 12.8543 8.74273 12.8748C8.63494 12.8916 8.53704 12.8664 8.45494 12.8303C8.27878 12.7544 8.16362 12.6292 8.16362 12.6292C7.99352 12.4379 7.69731 12.4175 7.50141 12.5848C7.30557 12.752 7.28599 13.0444 7.45615 13.2358Z" fill="#232536"/>\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0703 12.6292C11.0703 12.6292 10.9565 12.7544 10.779 12.8303C10.697 12.8652 10.599 12.8916 10.4913 12.8748C10.3628 12.8543 10.2636 12.8061 10.1988 12.7316C10.1216 12.6425 10.0911 12.5257 10.0849 12.4067C10.0727 12.1527 9.85231 11.9553 9.59405 11.9674C9.33579 11.9794 9.13621 12.196 9.14847 12.45C9.16442 12.7773 9.27468 13.0878 9.48515 13.3296C9.67858 13.5535 9.95768 13.7244 10.3432 13.7857C10.648 13.8338 10.9259 13.7749 11.1573 13.6751C11.5379 13.5114 11.7779 13.2358 11.7779 13.2358C11.9481 13.0444 11.9285 12.752 11.7326 12.5848C11.5367 12.4175 11.2405 12.4379 11.0703 12.6292Z" fill="#232536"/>\n        <path d="M14.7368 2.05128C13.9474 2.05128 12.6316 2.30769 11.8421 3.33333L15.7895 6.41026C16.2281 6.75214 17.358 7.44605 17.8947 6.92308C18.4211 6.41026 18.602 5.83338 18.4211 5.1282C17.8947 3.07692 16.0526 2.05128 14.7368 2.05128Z" fill="white"/>\n        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3542 4.49394C13.091 4.34845 12.9415 4.06214 12.9704 3.76404C13.0001 3.4684 13.2053 3.21804 13.4953 3.12496C14.2646 2.87804 15.1041 2.94025 15.8255 3.3024C16.5469 3.6645 17.0949 4.29086 17.346 5.04727L17.4696 5.41944C17.5675 5.71426 17.4673 6.03518 17.2175 6.22503C16.9678 6.41482 16.6275 6.43041 16.3603 6.26477C15.6249 5.80287 14.9359 5.37421 14.9359 5.37421C14.9359 5.37421 14.1381 4.92963 13.3542 4.49394Z" fill="#232536"/>\n      </g>\n    </svg>\n  ',
                            custom_controls_menu_icon: '\n    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">\n        <path d="M9.99992 5.83333C10.9204 5.83333 11.6666 5.08714 11.6666 4.16667C11.6666 3.24619 10.9204 2.5 9.99992 2.5C9.07944 2.5 8.33325 3.24619 8.33325 4.16667C8.33325 5.08714 9.07944 5.83333 9.99992 5.83333Z" fill="var(--plyr-custom-controls-menu-icon-color,#ffffff)"/>\n        <path d="M9.99992 11.6667C10.9204 11.6667 11.6666 10.9205 11.6666 10C11.6666 9.07953 10.9204 8.33333 9.99992 8.33333C9.07944 8.33333 8.33325 9.07953 8.33325 10C8.33325 10.9205 9.07944 11.6667 9.99992 11.6667Z" fill="var(--plyr-custom-controls-menu-icon-color,#ffffff)"/>\n        <path d="M11.6666 15.8333C11.6666 16.7538 10.9204 17.5 9.99992 17.5C9.07944 17.5 8.33325 16.7538 8.33325 15.8333C8.33325 14.9129 9.07944 14.1667 9.99992 14.1667C10.9204 14.1667 11.6666 14.9129 11.6666 15.8333Z" fill="var(--plyr-custom-controls-menu-icon-color,#ffffff)"/>\n    </svg>\n  '
                        }[e]
                    }
                }
            },
            2740: (e, t, n) => {
                var o = {
                    "./en.json": 1700,
                    "./es.json": 6980,
                    "./pt.json": 4193
                };

                function a(e) {
                    var t = r(e);
                    return n(t)
                }

                function r(e) {
                    if (!n.o(o, e)) {
                        var t = new Error("Cannot find module '" + e + "'");
                        throw t.code = "MODULE_NOT_FOUND", t
                    }
                    return o[e]
                }
                a.keys = function() {
                    return Object.keys(o)
                }, a.resolve = r, e.exports = a, a.id = 2740
            },
            1700: e => {
                "use strict";
                e.exports = JSON.parse('{"aboutPanda":"About Panda Video","aboutPandaLink":"https://pandavideo.com?utm_source=player&utm_campaign=rightclick","abstract":"E-Book","activateSound":"ACTIVATE SOUND","advertisement":"Advertisement","airplay":"Airplay","all":"All","audio":"Audio","buffered":"Stored in the buffer","cancel":"Cancel","cast":"Cast","captionPreview":"This is a preview of the caption setup","captions":"Subtitles","chapters":"Chapters","copy_button":"Copy","currentTime":"Current time","disableCaptions":"Disable Subtitles","disabled":"Disabled","download":"Transfer","download_button":"Download","drmPreload":"Setting up video security","duration":"Duration","enableCaptions":"Turn on subtitles","enabled":"Enabled","end":"End","enterFullscreen":"Enter fullscreen mode","exitFullscreen":"Exit full screen mode","fastForward":"Forward {seektime}s","frameTitle":"Reader for {title}","keepWatching":"Continue watching","panda_assist":{"sugestionsTitle":"QUESTION SUGGESTIONS:","generalError":"Chat is not available.","generalErorOpenChat":"Try opening it again in a few moments","resumeContent":"Resume content","importantTopics":"Important topics","chatWarning":"The chat is generated by artificial intelligence and may contain errors. Verify the information.","typeHere":"Type here...","waitAMoment":"Wait a moment...","source":"Source","watchVideo":"Watch video","copy":"Copy","copied":"Copied","excerptVideoTitle":"EXCERPT OF THE ANSWER"},"live_chat":{"removedMessage":"This message has been removed","you":"You","registerModal":{"title":"Join chat","actionBtn":"Join chat","namePlaceholder":"Name"}},"liveFinished":"LIVE FINISHED","loop":"Repeat","menuBack":"Back to previous menu","mindmap":"Mind Map","mute":"No sound","normal":"Normal","pause":"Pause","pip":"PIP","play":"Play","played":"Reproduced","quality":"Quality","qualityBadge":{"480":"SD","576":"SD","720":"HD","1080":"HD","1440":"HD","2160":"4K"},"questions":"Questions","reportModalAction1":"Submit","reportModalAction2":"Cancel","reportModalField":"Describe your problem...","reportModalOption1":"Video does not load even with a good internet connection.","reportModalOption2":"The video content does not match the description.","reportModalOption3":"The video is low quality or pixelated.","reportModalOption4":"Other","reportModalText1":"Please wait a moment, your feedback","reportModalText2":"is being sent.","reportModalText3":"Thanks for helping us improve!","reportModalTitle":"Report error","reset":"Reset","reset_button":"reset","restart":"Restart","rewind":"Rewind {seektime}s","seek":"Search","seekLabel":"{currentTime} of {duration}","settings":"Settings","speed":"Speed","start":"Start","trialWarning":"Panda Video trial mode.<br>Start billing to remove this message.","unmute":"With sound","volume":"Volume","waitingForLive":"WAITING FOR LIVE STREAM","watermark_question":"Enter your access key","smart_search_placeholder":"Search in the caption","watchOfflineModal":{"clickHere":"click here","learnMore":"Learn more","title":"Download video","subtitle":"Watch the video offline<br>and in the background","paragraph":"Point your phone\'s camera to download the video<br>on the Panda Video app.","paragraphMobile":"Click the button below to download the video in the Panda Video app.","btnText":"Download video in the app"},"videoNotFound":"Video not found","viewHotKeys":"View hotkeys","playPause":"Play/Pause","seekBackward":"Seek Backward","seekForward":"Seek Forward","increaseVolume":"Increase volume","decreaseVolume":"Decrease volume","muteVolume":"Mute","increaseSpeed":"Increase speed","decreaseSpeed":"Decrease speed","spaceOrK":"Space or K","upArrow":"Up arrow","downArrow":"Down arrow","leftArrow":"Left arrow","rightArrow":"Right arrow","shiftPeriod":"Shift + .","shiftComma":"Shift + ,"}')
            },
            6980: e => {
                "use strict";
                e.exports = JSON.parse('{"aboutPanda":"Acerca del Panda Video","aboutPandaLink":"https://pandavideo.com?utm_source=player&utm_campaign=rightclick","abstract":"E-Book","activateSound":"ACTIVAR SONIDO","advertisement":"Anuncio","airplay":"Airplay","all":"Todos","audio":"Audio","buffered":"Almacenado en el buffer","cancel":"Cancelar","cast":"Cast","captionPreview":"Esta es una previsualización de la configuración de subtítulos","captions":"Subtítulos","chapters":"Capítulos","copy_button":"Copiar","currentTime":"Hora actual","disableCaptions":"Deshabilitar Subtítulos","disabled":"Deshabilitado","download":"Transferir","download_button":"Download","drmPreload":"Preparando video seguridad","duration":"Duración","enableCaptions":"Activar subtítulos","enabled":"Habilitado","end":"Fin","enterFullscreen":"Entrar en modo de pantalla completa","exitFullscreen":"Salir del modo de pantalla completa","fastForward":"Adelante {seektime}s","frameTitle":"Lector de {title}","keepWatching":"Continuar viendo","panda_assist":{"sugestionsTitle":"SUGERENCIAS DE PREGUNTA:","generalError":"¡Ups! Algo salió mal con el chat","generalErorOpenChat":"Intenta abrirlo nuevamente en unos instantes","resumeContent":"Resumir contenido","importantTopics":"Temas importantes","chatWarning":"El chat es generado por inteligencia artificial y puede contener errores. Verifique la información.","typeHere":"Escribe aquí...","waitAMoment":"Espere un momento...","source":"Fuente","watchVideo":"Ver video","copy":"Copiar","copied":"Copiado","excerptVideoTitle":"FRAGMENTO DE LA RESPUESTA"},"live_chat":{"removedMessage":"Este mensaje ha sido eliminado","you":"Tu","registerModal":{"title":"Participa en la charla","actionBtn":"Entrar al chat","namePlaceholder":"Nombre"}},"liveFinished":"LIVE TERMINADO","loop":"Repetir","menuBack":"Volver al menú anterior","mindmap":"Mapa Mental","mute":"Sin sonido","normal":"Normal","pause":"Pausa","pip":"PIP","play":"Tocar","played":"Reproducido","quality":"Calidad","qualityBadge":{"480":"SD","576":"SD","720":"HD","1080":"HD","1440":"HD","2160":"4K"},"questions":"Preguntas","reportModalAction1":"Enviar","reportModalAction2":"Cancelar","reportModalField":"Describe tu problema...","reportModalOption1":"El video no carga, incluso con una buena conexión a Internet.","reportModalOption2":"El contenido del vídeo no coincide con la descripción.","reportModalOption3":"El video es de baja calidad o está pixelado.","reportModalOption4":"Otro","reportModalText1":"Espera un momento, tus comentarios","reportModalText2":"se está enviando.","reportModalText3":"¡Gracias por ayudarnos a mejorar!","reportModalTitle":"Informe de error","reset":"Reiniciar","reset_button":"restablecer","restart":"Reiniciar","rewind":"Rebobinar {seektime}s","seek":"Buscar","seekLabel":"{currentTime} de {duration}","settings":"Configuraciones","speed":"Velocidad","start":"Inicio","trialWarning":"Modo de prueba de video de Panda.<br>Comience la facturación para eliminar este mensaje.","unmute":"Con sonido","volume":"Volumen","waitingForLive":"ESPERANDO TRANSMISIÓN EN VIVO","watermark_question":"Ingrese su clave de acceso","smart_search_placeholder":"Buscar en el subtítulo","watchOfflineModal":{"clickHere":"clic aquí","learnMore":"Infórmate más","title":"Descargar video","subtitle":"Reproduce el video offline<br>y en segundo plano","paragraph":"Apunta la cámara de tu celular para descargar el video<br>en la aplicación Panda Video.","paragraphMobile":"Haz clic en el botón de abajo para descargar el video en la aplicación Panda Video.","btnText":"Descargar video en la app"},"videoNotFound":"Video no encontrado","viewHotKeys":"Ver atajos de teclado","playPause":"Reproducir/Pausar","seekBackward":"Retroceder","seekForward":"Avanzar","increaseVolume":"Aumentar volumen","decreaseVolume":"Disminuir volumen","muteVolume":"Mudo","increaseSpeed":"Aumentar velocidad","decreaseSpeed":"Disminuir velocidad","spaceOrK":"Espacio o K","upArrow":"Flecha arriba","downArrow":"Flecha abajo","leftArrow":"Flecha izquierda","rightArrow":"Flecha derecha","shiftPeriod":"Shift + .","shiftComma":"Shift + ,"}')
            },
            4193: e => {
                "use strict";
                e.exports = JSON.parse('{"aboutPanda":"Sobre a Panda Video","aboutPandaLink":"https://pandavideo.com.br?utm_source=player&utm_campaign=rightclick","abstract":"E-Book","activateSound":"ATIVAR SOM","advertisement":"Anúncio","airplay":"Airplay","all":"Tudo","audio":"Áudio","buffered":"Armazenado na memória buffer","cancel":"Cancelar","cast":"Transmitir","captionPreview":"Esta é uma pré-visualização da configuração de legenda","captions":"Legendas","chapters":"Capítulos","copy_button":"Copiar","currentTime":"Tempo atual","disableCaptions":"Desativar legendas","disabled":"Desativado","download":"Transferir","download_button":"Download","drmPreload":"Preparando segurança do vídeo","duration":"Duração","enableCaptions":"Ativar legendas","enabled":"Ativado","end":"Fim","enterFullscreen":"Entrar no modo tela cheia (fullscreen)","exitFullscreen":"Sair do modo tela cheia (fullscreen)","fastForward":"Avançar {seektime}s","frameTitle":"Leitor para {title}","keepWatching":"Continuar assistindo","panda_assist":{"sugestionsTitle":"SUGESTÕES DE PERGUNTA:","generalError":"Ops! Algo deu errado com o chat","generalErorOpenChat":"Tente abri-lo novamente em instantes","resumeContent":"Resumir conteúdo","importantTopics":"Tópicos importantes","chatWarning":"O chat é gerado por inteligência artificial e pode ter erros. Verifique as informações.","typeHere":"Digite aqui...","waitAMoment":"Aguarde um instante...","source":"Fonte","watchVideo":"Assistir vídeo","copy":"Copiar","copied":"Copiado","excerptVideoTitle":"TRECHO DA RESPOSTA"},"live_chat":{"removedMessage":"Esta mensagem foi removida","you":"Você","registerModal":{"title":"Participe do chat","actionBtn":"Entrar no chat","namePlaceholder":"Nome"}},"liveFinished":"LIVE FINALIZADA","loop":"Repetir","menuBack":"Voltar ao menu anterior","mindmap":"Mapa Mental","mute":"Sem som","normal":"Normal","pause":"Pausar","pip":"PIP","play":"Reproduzir","played":"Reproduzido","quality":"Qualidade","qualityBadge":{"480":"SD","576":"SD","720":"HD","1080":"HD","1440":"HD","2160":"4K"},"questions":"Perguntas","reportModalAction1":"Enviar","reportModalAction2":"Cancelar","reportModalField":"Descreva seu problema...","reportModalOption1":"O vídeo não carrega, mesmo com boa conexão de internet.","reportModalOption2":"O conteúdo do vídeo não corresponde com a descrição.","reportModalOption3":"O vídeo está em baixa qualidade ou pixelado.","reportModalOption4":"Outro","reportModalText1":"Aguarde um momento, seu feedback","reportModalText2":"está sendo enviado.","reportModalText3":"Obrigado por nos ajudar a melhorar!","reportModalTitle":"Reportar erro","reset":"Repor","reset_button":"resetar","restart":"Reiniciar","rewind":"Recuar {seektime}s","seek":"Procurar","seekLabel":"{currentTime} de {duration}","settings":"Definições","speed":"Velocidade","start":"Início","trialWarning":"Panda Video período de teste.<br>Inicie o plano para remover esta mensagem.","unmute":"Com som","volume":"Volume","waitingForLive":"AGUARDANDO LIVE STREAM","watermark_question":"Digite sua chave de acesso","smart_search_placeholder":"Buscar na legenda","watchOfflineModal":{"clickHere":"clique aqui","learnMore":"Saiba mais","title":"Baixar vídeo","subtitle":"Assista ao vídeo offline<br>e em segundo plano","paragraph":"Aponte a câmera do celular para baixar o vídeo<br>no aplicativo Panda Video.","paragraphMobile":"Clique no botão abaixo para baixar o vídeo no aplicativo Panda Video.","btnText":"Baixar vídeo no app"},"videoNotFound":"Vídeo não encontrado","viewHotKeys":"Ver atalhos de teclado","playPause":"Reproduzir/Pausar","seekBackward":"Retroceder","seekForward":"Avançar","increaseVolume":"Aumentar volume","decreaseVolume":"Diminuir volume","muteVolume":"Mudo","increaseSpeed":"Aumentar velocidade","decreaseSpeed":"Diminuir velocidade","spaceOrK":"Espaço ou K","upArrow":"Seta para cima","downArrow":"Seta para baixo","leftArrow":"Seta para a esquerda","rightArrow":"Seta para a direita","shiftPeriod":"Shift + .","shiftComma":"Shift + ,"}')
            }
        },
        n = {};

    function o(e) {
        var a = n[e];
        if (void 0 !== a) return a.exports;
        var r = n[e] = {
            exports: {}
        };
        return t[e].call(r.exports, r, r.exports, o), r.exports
    }
    o.m = t, e = [], o.O = (t, n, a, r) => {
        if (!n) {
            var i = 1 / 0;
            for (d = 0; d < e.length; d++) {
                for (var [n, a, r] = e[d], c = !0, l = 0; l < n.length; l++)(!1 & r || i >= r) && Object.keys(o.O).every((e => o.O[e](n[l]))) ? n.splice(l--, 1) : (c = !1, r < i && (i = r));
                if (c) {
                    e.splice(d--, 1);
                    var s = a();
                    void 0 !== s && (t = s)
                }
            }
            return t
        }
        r = r || 0;
        for (var d = e.length; d > 0 && e[d - 1][2] > r; d--) e[d] = e[d - 1];
        e[d] = [n, a, r]
    }, o.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return o.d(t, {
            a: t
        }), t
    }, o.d = (e, t) => {
        for (var n in t) o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, o.e = () => Promise.resolve(), o.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), o.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.j = 179, (() => {
        var e = {
            179: 0
        };
        o.O.j = t => 0 === e[t];
        var t = (t, n) => {
                var a, r, [i, c, l] = n,
                    s = 0;
                if (i.some((t => 0 !== e[t]))) {
                    for (a in c) o.o(c, a) && (o.m[a] = c[a]);
                    if (l) var d = l(o)
                }
                for (t && t(n); s < i.length; s++) r = i[s], o.o(e, r) && e[r] && e[r][0](), e[r] = 0;
                return o.O(d)
            },
            n = self.webpackChunkpanda_player = self.webpackChunkpanda_player || [];
        n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n))
    })();
    var a = o.O(void 0, [216], (() => o(4435)));
    a = o.O(a)
})();
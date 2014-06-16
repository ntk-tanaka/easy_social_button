$(function() {
  var Facebook, GooglePlus, Hatena, SOCIAL_BUTTON_CLASS_NAME, Twitter, klass, _i, _len, _ref;
  SOCIAL_BUTTON_CLASS_NAME = "social-button";
  Twitter = (function() {
    function Twitter() {}

    Twitter.prototype.getButtonTag = function(url, title) {
      return "<a href=\"http://twitter.com/share\" class=\"twitter-share-button\" data-url=\"" + url + "\" data-text=\"" + title + "\" data-lang=\"ja\">ツイート</a>";
    };

    Twitter.prototype.getScriptTag = function() {
      return "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>";
    };

    return Twitter;

  })();
  Hatena = (function() {
    function Hatena() {}

    Hatena.prototype.getButtonTag = function(url, title) {
      return "<a href=\"http://b.hatena.ne.jp/entry/" + url + "\" class=\"hatena-bookmark-button\" data-hatena-bookmark-title=\"" + title + "\" data-hatena-bookmark-layout=\"standard-balloon\" data-hatena-bookmark-lang=\"ja\" title=\"このエントリーをはてなブックマークに追加\"><img src=\"http://b.st-hatena.com/images/entry-button/button-only@2x.png\" alt=\"このエントリーをはてなブックマークに追加\" width=\"20\" height=\"20\" style=\"border: none;\" /></a>";
    };

    Hatena.prototype.getScriptTag = function() {
      return '<script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>';
    };

    return Hatena;

  })();
  GooglePlus = (function() {
    function GooglePlus() {}

    GooglePlus.prototype.getButtonTag = function(url, title) {
      return "<div class=\"g-plusone\" data-size=\"medium\" data-href=\"" + url + "\"></div>";
    };

    GooglePlus.prototype.getScriptTag = function() {
      return "<script type=\"text/javascript\">(function() {var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;po.src = 'https://apis.google.com/js/plusone.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);})();</script>";
    };

    return GooglePlus;

  })();
  Facebook = (function() {
    function Facebook() {}

    Facebook.prototype.getButtonTag = function(url, title) {
      return "<div class=\"fb-like\" data-href=\"" + url + "\" data-layout=\"button_count\" data-action=\"like\" data-show-faces=\"false\" data-share=\"false\"></div>";
    };

    Facebook.prototype.getScriptTag = function() {
      return "<div id=\"fb-root\"></div>      <script>(function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0];        if (d.getElementById(id)) return;        js = d.createElement(s); js.id = id;        js.src = \"//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.0\";        fjs.parentNode.insertBefore(js, fjs);      }(document, 'script', 'facebook-jssdk'));</script>";
    };

    return Facebook;

  })();
  if (0 < $("." + SOCIAL_BUTTON_CLASS_NAME).length) {
    _ref = [Hatena, Twitter, Facebook, GooglePlus];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      klass = _ref[_i];
      $("body").prepend((new klass()).getScriptTag());
    }
  }
  return $("." + SOCIAL_BUTTON_CLASS_NAME).each(function() {
    var $target, button_tag, is_horizontal, title, url, _j, _len1, _ref1;
    $target = $(this);
    url = $target.data("url") != null ? $target.data("url") : location.href;
    title = $target.data("title") != null ? $target.data("title") : $("title").text();
    if ($target.data("design") === "horizontal") {
      is_horizontal = true;
    } else if ($target.data("design") === "vertical") {
      is_horizontal = false;
    } else {
      is_horizontal = true;
    }
    _ref1 = [Hatena, Twitter, Facebook, GooglePlus];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      klass = _ref1[_j];
      button_tag = (new klass()).getButtonTag(url, title);
      if (is_horizontal) {
        $target.append("<div style=\"display: inline; margin-right: 5px;\">" + button_tag + "</div>");
      } else {
        $target.append("<div style=\"margin: 5px 0;\">" + button_tag + "</div>");
      }
    }
  });
});

$ ->
  SOCIAL_BUTTON_CLASS_NAME = "social-button"

  class Twitter
    getButtonTag: (url, title) ->
      "<a href=\"http://twitter.com/share\" class=\"twitter-share-button\" data-url=\"#{url}\" data-text=\"#{title}\" data-lang=\"ja\">ツイート</a>"
    getScriptTag: ->
      "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>"

  class Hatena
    getButtonTag: (url, title) ->
      "<a href=\"http://b.hatena.ne.jp/entry/#{url}\" class=\"hatena-bookmark-button\" data-hatena-bookmark-title=\"#{title}\" data-hatena-bookmark-layout=\"standard-balloon\" data-hatena-bookmark-lang=\"ja\" title=\"このエントリーをはてなブックマークに追加\"><img src=\"http://b.st-hatena.com/images/entry-button/button-only@2x.png\" alt=\"このエントリーをはてなブックマークに追加\" width=\"20\" height=\"20\" style=\"border: none;\" /></a>"
    getScriptTag: ->
      '<script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>'

  class GooglePlus
    getButtonTag: (url, title) ->
      "<div class=\"g-plusone\" data-size=\"medium\" data-href=\"#{url}\"></div>"

    getScriptTag: ->
      "<script type=\"text/javascript\">(function() {var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;po.src = 'https://apis.google.com/js/plusone.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);})();</script>"

  class Facebook
    getButtonTag: (url, title) ->
      "<div class=\"fb-like\" data-href=\"#{url}\" data-layout=\"button_count\" data-action=\"like\" data-show-faces=\"false\" data-share=\"false\"></div>"

    getScriptTag: ->
      "<div id=\"fb-root\"></div>
      <script>(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = \"//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.0\";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));</script>"

  if 0 < $(".#{SOCIAL_BUTTON_CLASS_NAME}").length
    for klass in [Hatena, Twitter, Facebook, GooglePlus]
      $("body").prepend((new klass()).getScriptTag())

  $(".#{SOCIAL_BUTTON_CLASS_NAME}").each ->
    $target = $(@)

    url = if $target.data("url")? then $target.data("url") else location.href
    title = if $target.data("title")? then $target.data("title") else $("title").text()

    if $target.data("design") == "horizontal"
      is_horizontal = true
    else if $target.data("design") == "vertical"
      is_horizontal = false
    else
      # 水平デフォルトとする
      is_horizontal = true

    for klass in [Hatena, Twitter, Facebook, GooglePlus]
      button_tag = (new klass()).getButtonTag(url, title)
      if is_horizontal
        $target.append("<div style=\"display: inline; margin-right: 5px;\">#{button_tag}</div>")
      else
        $target.append("<div style=\"margin: 5px 0;\">#{button_tag}</div>")

    return

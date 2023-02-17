import PageManager from "./page-manager";
import utils from "@bigcommerce/stencil-utils";
import collapsibleFactory from "./common/collapsible";

export default class Blog extends PageManager {
  onReady() {
    collapsibleFactory();
    this.blogFilter(this.context.posts);
    this.fetchRecentPosts();
  }

  // SSCODE 230216: populating the Filter By Tag and Filter By Product list
  blogFilter(posts) {
    let tagArr = [];
    let prodTagArr = [];
    $.get("https://sufri.autocode.dev/l5t@dev/getProdListAT/", function (res) {
      res.tagsList.forEach((tag) => {
        if (!res.productList.includes(tag)) {
          tagArr.push(tag);
        }
      });

      tagArr.forEach((tag) => {
        const tagFilterTemplate = `<li class="blog-sidebar__list-item">
            <a href="/blog/tag/${tag}">${tag.toUpperCase()}</a>
        </li>`;

        $("#tagList").append(tagFilterTemplate);
      });

      if (window.location.href.indexOf("tag") > -1) {
        $("#tagList").append(`<li class="blog-sidebar__list-item">
            <a href="/blog/">SHOW ALL</a>
        </li>`);
      }

      posts.forEach((post) => {
        post.tags.forEach((tag) => {
          if (
            res.productList.includes(tag.name) &&
            !prodTagArr.includes(tag.name)
          ) {
            prodTagArr.push(tag.name);
          }
        });
      });

      prodTagArr.forEach((tag) => {
        const prodFilterTemplate = `<li class="blog-sidebar__list-item product-tag">
            <a>${tag.toUpperCase()}</a>
        </li>`;

        $("#productList").append(prodFilterTemplate);
      });

      $("#productList").append(
        `<li class="blog-sidebar__list-item product-tag"><a>SHOW ALL</a></li>`
      );
    }).then((next) => {
      this.configureIsotope();
    });
  }

  // SSCODE 230216: configuring Isotope(filtering function) for blog cards
  configureIsotope() {
    let grid = document.getElementById("blogPostsContainer");
    let iso = new Isotope(grid, { itemSelector: ".blog-post__card" });

    let prodFilterTag = document.querySelectorAll(".product-tag");

    for (let i = 0; i < prodFilterTag.length; i++) {
      prodFilterTag[i].addEventListener("click", function (event) {
        let prodFil = event.target.innerHTML.toLowerCase();
        const arr = prodFil.split(" ");
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const tagCapitalized = arr.join(" ");

        if (tagCapitalized === "Show All") {
          iso.arrange({ filter: "*" });
        } else {
          iso.arrange({
            filter: function (itemElem) {
              const val = itemElem.getAttribute("data-filter");

              if (val.includes(tagCapitalized)) {
                return true;
              } else {
                return false;
              }
            },
          });
        }
      });
    }
  }

  fetchRecentPosts() {
    const $sidebarRecent = $("#blog-sidebar-recent");

    if (!$sidebarRecent.length) return;

    const requestOptions = {
      config: {
        blog: {
          recent_posts: {
            limit: 5,
          },
        },
      },
      template: "custom/blog/blog-recent-post-items",
    };

    utils.api.getPage("/", requestOptions, (err, res) => {
      $sidebarRecent.html(res);
    });
  }
}

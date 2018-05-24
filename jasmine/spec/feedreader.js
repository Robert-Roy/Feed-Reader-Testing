/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    describe('RSS Feeds', function () {
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('should have valid URLs', function () {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        })

        it('should have valid names', function () {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        })
    });

    describe('The menu', function () {
        it('should not be visible by default', function () {
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
        });
        it('should be visible if clicked', function () {
            $('.menu-icon-link').click();
            expect(document.body.classList.contains("menu-hidden")).toBe(false);
            $('.menu-icon-link').click();
        });
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0);
            setTimeout(done, 2000);
        })
        it('has entries present after loadFeed', function (done) {
            var result = false;
            var $articles = $('.feed').find('article');
            for (var i = 0, len = $articles.length; i < len; i++) {
                if ($articles.hasClass('entry')) {
                    result = true;
                    break;
                }
            }
            expect(result).toBe(true);
            done();
        });
    });

    describe('New Feed Selection', function (done) {
        var articlesOriginal = $('.feed').find('article');
        var articlesNew = $('.feed').find('article');
        beforeEach(function (done) {
            loadFeed(0);
            setTimeout(done, 2000);
        })
        it('successfully load initial feed for comparison', function (done) {
            articlesOriginal = $('.feed').find('article');
            expect(articlesOriginal).toBeDefined();
            loadFeed(1);
            setTimeout(done, 2000);
        });
        it('new feed actually changes the old feed', function (done) {
            articlesNew = $('.feed').find('article');
            expect(articlesNew).toBeDefined();
            console.log(articlesOriginal);
            console.log(articlesNew);
            expect(articlesNew === articlesOriginal).toBe(false);
            done();
        });
    });
});

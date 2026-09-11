# Film imagery and trailer sources

Researched 11 September 2026 for the coursework/portfolio concept **Made to Fight, Made to Represent**. All five entries refer to the films in `web.pdf`; no sequels or other same-name films were substituted.

## Implementation choices

Use the real posters/stills below with linked source credits. Four trailers have studio/distributor YouTube uploads. **The Rebel also has an official trailer destination on Apple TV**, but no studio/distributor YouTube embed was verified. Its trailer action should open the Apple TV clip page, with the film page as a fallback. Do not label an unverified fan upload official.

Downloaded candidates are in `tmp/film-assets/` for review only. A successful image download establishes availability, not a reuse license. The sources did not supply an open license or blanket permission for this portfolio use. Preserve attribution, do not imply festival endorsement, and retain the source record when copying selected images into the website. No legal clearance is claimed here.

The YouTube IDs are verified in the named source pages or indexed channel metadata. Standard embed URLs are provided for implementation, but playback/embedding and regional availability still need checking in the finished website.

## Hero (2002)

- **Primary source:** [Miramax film page](https://www.miramax.com/movie/hero-ying-xiong/). Lists the 2002 film, Jet Li, Tony Leung, Maggie Cheung, Donnie Yen, Ziyi Zhang, and director Yimou Zhang.
- **Poster:** [Miramax Hero poster](https://www.miramax.com/assets/Hero1.png). Downloaded as `tmp/film-assets/hero-poster.png`; 500 x 733 pixels.
- **Clip thumbnail:** [Golden Opportunity thumbnail](https://i.ytimg.com/vi/Bl4_BbYMZEo/maxresdefault.jpg). This exact image is referenced on the Miramax film page. Downloaded as `tmp/film-assets/hero-still.jpg`; 1280 x 720 pixels. Visually inspected: close view of Maggie Cheung with a blade near her neck and a prominent MIRAMAX mark at lower left. It is real film imagery but less suitable as an unbranded atmospheric background; keep the visible source mark intact.
- **Additional image lead:** [BFI, 10 great wuxia films](https://www.bfi.org.uk/lists/10-great-wuxia-swordplay-films) embeds [Maggie Cheung with sword in desert](https://core-cms.bfi.org.uk/sites/default/files/styles/responsive/public/2022-03/hero-2002-maggie-cheung-sword-desert.jpg/1300x0/hero-2002-maggie-cheung-sword-desert.jpg). Asset URL was extracted from the live page, but direct download returned HTTP 403, so it is not a verified working image for this build. Do not depend on it without a successful browser check.
- **Trailer destination:** [Hero official trailer on YouTube](https://www.youtube.com/watch?v=MgsddFEe9Oc).
- **Embed:** `https://www.youtube.com/embed/MgsddFEe9Oc`
- **Trailer provenance:** Miramax's own film page labels the associated video “Hero - Official Trailer (HD)” and associates its thumbnail with this ID.
- **Suggested source credit:** “Hero (2002). Poster and promotional imagery sourced from Miramax.” This is a source credit, not a license claim.

## Ip Man (2008)

- **Primary source:** [Well Go USA official film page](https://wellgousa.com/films/ip-man). Identifies Donnie Yen and director Wilson Yip. Its 2010 release field is the distributor's US release; preserve the brief's original film year, 2008.
- **Poster:** [Official key art](https://wellgousa.com/sites/default/files/2023-02/IpMan-ChineseDramaActionMartialArtsAdventure-WellGoUSA-KeyArtPoster-812x1200.jpg). Downloaded as `tmp/film-assets/ipman-poster.jpg`. The page labels it official key art from distributor Well Go USA.
- **Landscape still:** [Official film page hero image](https://wellgousa.com/sites/default/files/2023-02/IpMan-ChineseDramaActionMartialArtsAdventure-WellGoUSA-Hero-1340x754.jpg). Downloaded as `tmp/film-assets/ipman-still.jpg`; 1340 x 754 pixels. Visually inspected: Donnie Yen with a staff in a dim industrial interior. Strong usable landscape composition.
- **Trailer destination:** [Ip Man official US trailer](https://www.youtube.com/watch?v=wv9PD1_JIC8).
- **Embed:** `https://www.youtube.com/embed/wv9PD1_JIC8`
- **Trailer provenance:** Embedded by the official film page; indexed YouTube metadata identifies the verified **Well Go USA Entertainment** channel, published 29 June 2010.
- **Suggested source credit:** “Ip Man (2008). Promotional imagery sourced from Well Go USA Entertainment.” No open reuse license was observed.
- **Fetch note:** Bundled Python lacked the needed TLS certificate chain for Well Go; native Windows `Invoke-WebRequest` fetched the HTTPS page and both assets normally, without disabling certificate checks.

## The Rebel (2007) / Dong mau anh hung

- **Festival source:** [Da Nang Asian Film Festival film entry](https://danaff.vn/phim-du-thi/dien-anh-viet-nam-40-nam-doi-moi-id13/dong-mau-anh-hung-id259). The page is explicitly for THE REBEL with Charlie Nguyen, and has the film poster and backdrop. It is an institutional festival source, not a grant from the rightsholder.
- **Poster:** [DANAFF poster](https://danaff.vn/uploads/2026/05/1779765955_3.jpg). Downloaded as `tmp/film-assets/rebel-poster.jpg`; 1412 x 2048 pixels.
- **Backdrop:** [DANAFF backdrop](https://danaff.vn/uploads/2026/05/1779683424_the-rebelwebbackdrope479922c8d231ab5d37ef73cea1d6a0d.webp). Downloaded as `tmp/film-assets/rebel-backdrop.webp`; 700 x 394 pixels. Visually inspected: Johnny Tri Nguyen behind Veronica Ngo in warm light. Real film imagery, but modest resolution; best for a small card or softly treated background rather than a sharp full-width desktop image.
- **Licensed-platform source:** [Apple TV film page](https://tv.apple.com/us/movie/the-rebel/umc.cmc.6zkvq0xvguupz9mn560re1b9m). Identifies 2007, Charlie Nguyen, Vietnamese origin, Lionsgate, and the displayed copyright **2006 Chanh Phuong Phim**.
- **Alternate landscape artwork:** [Apple TV promotional artwork](https://is1-ssl.mzstatic.com/image/thumb/T5IyjveHMvDaqjZrY5CtUg/1200x675.jpg). Exact `og:image` URL extracted from the Apple TV page; not downloaded or visually inspected in this pass.
- **Official trailer destination:** [The Rebel - Official Trailer on Apple TV](https://tv.apple.com/us/clip/the-rebel/umc.cmc.4jhgbuxv2uejlt8r97g0uluqq?targetId=umc.cmc.6zkvq0xvguupz9mn560re1b9m&targetType=Movie).
- **Trailer provenance:** The film page links its [trailers collection](https://tv.apple.com/us/collection/trailers/uts.col.Trailers.umc.cmc.6zkvq0xvguupz9mn560re1b9m). The collection's live HTML links the exact clip URL above; the clip page identifies itself as **The Rebel - Official Trailer**. This is a platform-hosted trailer destination, not a verified embeddable YouTube upload. Region or account behavior may differ.
- **Implementation:** Open the Apple TV trailer destination in a new tab with a clearly labeled source. Keep the Apple TV film page as fallback. No iframe URL was verified.
- **Excluded candidate:** `https://www.youtube.com/watch?v=EQQNNg-PKm0` is titled “The Rebel - Dragon Dynasty Trailer” but was uploaded by **actionfan2000**, not a verified studio/distributor. Do not use it as the official trailer.
- **Suggested source credit:** “The Rebel (2007). Film imagery sourced from Da Nang Asian Film Festival. Film copyright shown by Apple TV: 2006 Chanh Phuong Phim. Trailer via Apple TV / Lionsgate.” The film copyright line does not prove ownership of every promotional photograph.

## The Protector (2005) / Tom Yum Goong

- **Primary studio source:** [Sahamongkolfilm film page](https://sahamongkolfilm.com/saha-movie/tom-yum-goong-protector-2548). Explicitly identifies Tom Yum Goong / The Protector and its 11 August 2005 release.
- **Poster:** [Official studio poster](https://storage.googleapis.com/sahamongkolfilm-media/2020/06/Tom-Yum-Goong-Poster02.jpg). Downloaded as `tmp/film-assets/protector-poster.jpg`; actual image dimensions 701 x 1000 pixels despite the page's different Open Graph dimension metadata.
- **Landscape still:** [Studio hero image](https://storage.googleapis.com/sahamongkolfilm-media/2020/06/Tom-Yum-Goong-TR.jpg). Downloaded as `tmp/film-assets/protector-backdrop.jpg`; 1200 x 800 pixels. Visually inspected: Tony Jaa kneeling in a red-lit interior holding two long weapons. Strong warm cinematic composition with clear subject.
- **Secondary still:** [Studio still 06](https://storage.googleapis.com/sahamongkolfilm-media/2020/06/Tom-Yum-Goong-Still06.jpg). Downloaded as `tmp/film-assets/protector-still06.jpg`; 1000 x 667 pixels. Visually inspected: two police officers; less relevant for a martial-arts hero image.
- **Trailer destination:** [Tom Yum Goong official trailer](https://www.youtube.com/watch?v=4Pev6lkexo8).
- **Embed:** `https://www.youtube.com/embed/4Pev6lkexo8`
- **Trailer provenance:** Indexed YouTube metadata identifies **Sahamongkolfilm International Co.,Ltd**, published 8 June 2023, with original release date 11 August 2005 and director Prachya Pinkaew. [Brain Dead Studios' exhibitor page](https://studios.wearebraindead.com/movies/the-protector/) also embeds this exact ID for the 2005 film.
- **Suggested source credit:** “The Protector / Tom Yum Goong (2005). Promotional imagery and trailer sourced from Sahamongkolfilm International.” No open reuse license was observed.
- **Excluded source:** `theprotectormovie.com` claims to reproduce archived official content but mixes credits associated with the unrelated 1985 film. The current Sahamongkolfilm page above is the reliable source used here.

## 13 Assassins (2010)

- **Primary distributor page:** [Magnet Releasing](https://www.magnetreleasing.com/13assassins/). Names Takashi Miike, Koji Yakusho, Takayuki Yamada and Yusuke Iseya, confirming the 2010 film rather than the 1963 original.
- **Primary image source:** [Magnolia Pictures / Magnet official press kit](https://www.magnoliapictures.com/13assassins-press-kit).
- **Still 2:** [Koji Yakusho in combat](https://images.squarespace-cdn.com/content/v1/576454e629687fb39bd1f977/1614193418906-BZ24XHLHFI40GQPCMDOD/2.jpg). Downloaded as `tmp/film-assets/assassins-still2.jpg`; 2500 x 1667 pixels. Visually inspected: dynamic wide sword fight in a village street, blue-grey smoke, blood visible on actors and ground. Suitable for action atmosphere when not rendered as a shocking close-up.
- **Still 3:** [A scene from the film](https://images.squarespace-cdn.com/content/v1/576454e629687fb39bd1f977/1614193426035-LMHE60JJV3NHSOKSJRSJ/3.JPG). Downloaded as `tmp/film-assets/assassins-still3.jpg`; 2500 x 1667 pixels. Download verified; not visually inspected in this pass.
- **Still 4:** [Koji Yakusho](https://images.squarespace-cdn.com/content/v1/576454e629687fb39bd1f977/1614193427018-OHNENPAHXS0OL31XDRIT/4.JPG). Downloaded as `tmp/film-assets/assassins-still4.jpg`; 2500 x 1612 pixels. Download verified; not visually inspected in this pass.
- **Poster/banner reference:** [Magnet site share artwork](https://www.magnetreleasing.com/13assassins/images/poster-fb.jpg). Exact path is in the distributor site's Open Graph metadata, which specifies 1200 x 630 pixels. Not downloaded or visually inspected. The press stills above are the verified available candidates.
- **Trailer destination:** [13 Assassins trailer](https://www.youtube.com/watch?v=Xpm007vne54).
- **Embed:** `https://www.youtube.com/embed/Xpm007vne54`
- **Trailer provenance:** Indexed YouTube metadata identifies the verified **Magnolia Pictures & Magnet Releasing** channel, published 1 April 2011. The US trailer release is later than the film's 2010 Japanese release.
- **Credit:** The press kit explicitly supplies **“Photo courtesy of Magnet Releasing.”** Preserve that wording in image credits. The [Japanese Film Database entry](https://jfdb.jp/en/title/2232) identifies the 2010 film and credits **2010 Thirteen Assassins Film Partners**. The press kit does not establish an open license.

## What remains to verify during implementation

1. Render every selected local image and confirm the final crop preserves faces, key action and existing source marks. Only the specifically marked candidates above received visual inspection.
2. Test the four YouTube embeds in the actual browser and retain direct watch links if embedding is unavailable.
3. Test The Rebel's Apple TV trailer destination from the user's region; use the Apple TV film page as fallback, not a guessed trailer ID.
4. Treat real screening information as absent: these source links do not establish dates, tickets, or a schedule for the coursework festival.

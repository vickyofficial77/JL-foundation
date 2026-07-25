import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/config";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  Clock,
  Share2,
  Tag,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";

export default function NewsFeatureDetailPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  // ============================================
  // STATE
  // ============================================

  const [story, setStory] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
  RELATED STORIES
  */

  const [relatedStories, setRelatedStories] =
    useState([]);

  const [relatedLoading, setRelatedLoading] =
    useState(true);

  /*
  GALLERY
  */

  const [activeGalleryIndex, setActiveGalleryIndex] =
    useState(0);

  // ============================================
  // FETCH ARTICLE
  // ============================================

  useEffect(() => {
    let isMounted = true;

    async function fetchStory() {
      if (!id) {
        setError(
          "No news article ID was provided."
        );

        setLoading(false);

        return;
      }

      try {
        setLoading(true);

        setError("");

        setStory(null);

        setActiveGalleryIndex(0);

        const storyRef = doc(
          db,
          "news_stories",
          id
        );

        const snapshot =
          await getDoc(storyRef);

        if (!snapshot.exists()) {
          if (isMounted) {
            setStory(null);

            setError(
              "The requested news article could not be found."
            );
          }

          return;
        }

        if (isMounted) {
          setStory({
            id: snapshot.id,
            ...snapshot.data(),
          });
        }
      } catch (err) {
        console.error(
          "Error loading news article:",
          err
        );

        if (isMounted) {
          setError(
            err.message ||
              "Unable to load this article. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchStory();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // ============================================
  // FETCH RELATED STORIES
  // ============================================

  useEffect(() => {
    let isMounted = true;

    async function fetchRelatedStories() {
      try {
        setRelatedLoading(true);

        const storiesQuery =
          query(
            collection(
              db,
              "news_stories"
            ),
            orderBy(
              "timestamp",
              "desc"
            )
          );

        const snapshot =
          await getDocs(
            storiesQuery
          );

        const stories =
          snapshot.docs
            .map(
              (storyDoc) => ({
                id: storyDoc.id,
                ...storyDoc.data(),
              })
            )
            .filter(
              (item) =>
                item.id !== id
            );

        if (isMounted) {
          setRelatedStories(
            stories.slice(0, 6)
          );
        }
      } catch (err) {
        console.error(
          "Error loading related stories:",
          err
        );

        if (isMounted) {
          setRelatedStories([]);
        }
      } finally {
        if (isMounted) {
          setRelatedLoading(false);
        }
      }
    }

    fetchRelatedStories();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // ============================================
  // FORMAT DATE
  // ============================================

  const formatDate = () => {
    if (!story) {
      return "No date";
    }

    if (story.timestamp?.toDate) {
      return story.timestamp
        .toDate()
        .toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
    }

    if (story.date) {
      return story.date;
    }

    return "No date";
  };

  // ============================================
  // READING TIME
  // ============================================

  const getReadingTime = () => {
    const article =
      story?.detailArticle ||
      story?.description ||
      "";

    const words =
      article
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;

    const minutes =
      Math.max(
        1,
        Math.ceil(words / 200)
      );

    return `${minutes} min read`;
  };

  // ============================================
  // SHARE
  // ============================================

  const handleShare = async () => {
    try {
      if (
        navigator.share
      ) {
        await navigator.share({
          title:
            story?.title ||
            "News Article",

          text:
            story?.shortArticle ||
            "",

          url:
            window.location.href,
        });

        return;
      }

      await navigator.clipboard.writeText(
        window.location.href
      );

      alert(
        "Article link copied to clipboard."
      );
    } catch (err) {
      console.error(
        "Share failed:",
        err
      );
    }
  };

  // ============================================
  // GALLERY DATA
  // ============================================

  const galleryImages =
    Array.isArray(
      story?.gallery
    )
      ? story.gallery.filter(
          Boolean
        )
      : [];

  // ============================================
  // GALLERY NEXT
  // ============================================

  const nextGalleryImage = () => {
    if (
      galleryImages.length <= 1
    ) {
      return;
    }

    setActiveGalleryIndex(
      (current) =>
        (current + 1) %
        galleryImages.length
    );
  };

  // ============================================
  // GALLERY PREVIOUS
  // ============================================

  const previousGalleryImage = () => {
    if (
      galleryImages.length <= 1
    ) {
      return;
    }

    setActiveGalleryIndex(
      (current) =>
        current === 0
          ? galleryImages.length - 1
          : current - 1
    );
  };

  // ============================================
  // OPEN RELATED STORY
  // ============================================

  const openRelatedStory = (
    storyId
  ) => {
    if (!storyId) {
      return;
    }

    navigate(
      `/news/${storyId}`
    );
  };

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />

        <main className="pt-32 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">

            <div className="h-4 w-32 bg-slate-200 rounded mb-8" />

            <div className="max-w-4xl">

              <div className="h-5 w-24 bg-slate-200 rounded mb-5" />

              <div className="h-14 bg-slate-200 rounded w-full mb-4" />

              <div className="h-14 bg-slate-200 rounded w-4/5 mb-8" />

            </div>

            <div className="flex gap-6 mb-10">

              <div className="h-5 w-32 bg-slate-200 rounded" />

              <div className="h-5 w-32 bg-slate-200 rounded" />

            </div>

            <div className="aspect-[16/8] bg-slate-200 rounded-3xl mb-12" />

            <div className="max-w-3xl mx-auto space-y-4">

              <div className="h-5 bg-slate-200 rounded" />

              <div className="h-5 bg-slate-200 rounded" />

              <div className="h-5 bg-slate-200 rounded w-5/6" />

            </div>

          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ============================================
  // ERROR
  // ============================================

  if (
    error ||
    !story
  ) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center px-4 pt-24">

          <div className="max-w-lg text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center mb-5">

              <AlertCircle className="w-8 h-8 text-rose-500" />

            </div>

            <h1 className="text-2xl font-bold text-[#243f57]">

              {error?.includes(
                "not be found"
              )
                ? "Article Not Found"
                : "Unable to Load Article"}

            </h1>

            <p className="mt-3 text-slate-500 leading-7">

              {error ||
                "The requested news article does not exist or may have been removed."}

            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/news-features"
                  )
                }
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0d58ad] text-white font-bold text-sm hover:bg-[#0b4c96] transition"
              >

                <ArrowLeft className="w-4 h-4" />

                Back to News

              </button>

              {error &&
                !error.includes(
                  "not be found"
                ) && (

                  <button
                    type="button"
                    onClick={() =>
                      window.location.reload()
                    }
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 transition"
                  >

                    <RefreshCw className="w-4 h-4" />

                    Try Again

                  </button>

                )}

            </div>

          </div>

        </main>

        <Footer />
      </div>
    );
  }

  // ============================================
  // ARTICLE PAGE
  // ============================================

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">

      <Navbar />

      <main className="flex-1 pt-28 pb-24">

        {/* ============================================
            ARTICLE HEADER
        ============================================ */}

        <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* BACK */}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/news-features"
              )
            }
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#0d58ad] transition"
          >

            <ArrowLeft className="w-4 h-4" />

            Back to News & Features

          </button>

          <div className="mt-10 max-w-4xl">

            {/* CATEGORY */}

            <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-[#0d58ad]">

              {story.category ||
                story.label ||
                "News"}

            </span>

            {/* TITLE */}

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#243f57]">

              {story.title}

            </h1>

            {/* SHORT ARTICLE */}

            {story.shortArticle && (

              <p className="mt-7 text-lg sm:text-xl text-slate-600 leading-8 max-w-3xl">

                {story.shortArticle}

              </p>

            )}

            {/* META */}

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm text-slate-500">

              <span className="inline-flex items-center gap-2">

                <User className="w-4 h-4 text-[#0d58ad]" />

                {story.author ||
                  "Admin"}

              </span>

              <span className="inline-flex items-center gap-2">

                <Calendar className="w-4 h-4 text-[#0d58ad]" />

                {formatDate()}

              </span>

              <span className="inline-flex items-center gap-2">

                <Clock className="w-4 h-4 text-[#0d58ad]" />

                {getReadingTime()}

              </span>

            </div>

          </div>

          {/* FEATURE IMAGE */}

          {story.image && (

            <figure className="mt-12">

              <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-100">

                <img
                  src={
                    story.image
                  }
                  alt={
                    story.title ||
                    "News article"
                  }
                  className="block w-full h-auto max-h-[760px] object-contain mx-auto"
                />

              </div>

            </figure>

          )}

        </header>

        {/* ============================================
            ARTICLE CONTENT
        ============================================ */}

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">

          <div className="text-[17px] sm:text-[18px] leading-[1.9] text-slate-700 whitespace-pre-line">

            {story.detailArticle ||
              story.description ||
              "No detailed article content is available."}

          </div>

          {/* ============================================
              PHOTO GALLERY
          ============================================ */}

          {galleryImages.length >
            0 && (

            <section className="mt-16 pt-12 border-t border-slate-200">

              <div className="flex items-center justify-between gap-4 mb-7">

                <div>

                  <div className="flex items-center gap-2">

                    <Images className="w-5 h-5 text-[#0d58ad]" />

                    <h2 className="text-2xl sm:text-3xl font-black text-[#243f57]">
                      Photo Gallery
                    </h2>

                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Photos from this story
                  </p>

                </div>

                <span className="text-sm font-semibold text-slate-500 whitespace-nowrap">
                  {activeGalleryIndex +
                    1}{" "}
                  /{" "}
                  {
                    galleryImages.length
                  }
                </span>

              </div>

              {/* MAIN GALLERY */}

              <div className="relative group">

                <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">

                  <img
                    src={
                      galleryImages[
                        activeGalleryIndex
                      ]
                    }
                    alt={`${story.title} gallery photo ${
                      activeGalleryIndex +
                      1
                    }`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />

                  {/* PREVIOUS */}

                  {galleryImages.length >
                    1 && (

                    <button
                      type="button"
                      onClick={
                        previousGalleryImage
                      }
                      aria-label="Previous gallery image"
                      className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm text-[#243f57] flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition"
                    >

                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />

                    </button>

                  )}

                  {/* NEXT */}

                  {galleryImages.length >
                    1 && (

                    <button
                      type="button"
                      onClick={
                        nextGalleryImage
                      }
                      aria-label="Next gallery image"
                      className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm text-[#243f57] flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition"
                    >

                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />

                    </button>

                  )}

                </div>

              </div>

              {/* THUMBNAILS */}

              {galleryImages.length >
                1 && (

                <div className="mt-5 flex gap-3 overflow-x-auto pb-2 scrollbar-thin">

                  {galleryImages.map(
                    (
                      image,
                      index
                    ) => (

                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() =>
                          setActiveGalleryIndex(
                            index
                          )
                        }
                        className={`flex-none w-20 h-16 sm:w-24 sm:h-20 overflow-hidden rounded-xl transition-all ${
                          activeGalleryIndex ===
                          index
                            ? "ring-2 ring-[#0d58ad] ring-offset-2"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >

                        <img
                          src={
                            image
                          }
                          alt={`Thumbnail ${
                            index +
                            1
                          }`}
                          className="w-full h-full object-cover"
                        />

                      </button>

                    )
                  )}

                </div>

              )}

              {/* NEXT BUTTON BELOW */}

              {galleryImages.length >
                1 && (

                <div className="mt-6 flex justify-center">

                  <button
                    type="button"
                    onClick={
                      nextGalleryImage
                    }
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0d58ad] hover:gap-3 transition-all"
                  >

                    Next Photo

                    <ArrowRight className="w-4 h-4" />

                  </button>

                </div>

              )}

            </section>

          )}

          {/* ============================================
              TAGS
          ============================================ */}

          {Array.isArray(
            story.tags
          ) &&
            story.tags.length > 0 && (

              <div className="mt-12 pt-7 border-t border-slate-200">

                <div className="flex items-center gap-2 mb-4">

                  <Tag className="w-4 h-4 text-[#0d58ad]" />

                  <span className="text-sm font-bold text-slate-700">
                    Tags
                  </span>

                </div>

                <div className="flex flex-wrap gap-2">

                  {story.tags.map(
                    (
                      tag,
                      index
                    ) => (

                      <span
                        key={`${tag}-${index}`}
                        className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold"
                      >

                        #{tag}

                      </span>

                    )
                  )}

                </div>

              </div>

            )}

          {/* ============================================
              BOTTOM ACTIONS
          ============================================ */}

          <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/news-features"
                )
              }
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0d58ad] hover:gap-3 transition-all"
            >

              <ArrowLeft className="w-4 h-4" />

              More News & Features

            </button>

            <button
              type="button"
              onClick={
                handleShare
              }
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition"
            >

              <Share2 className="w-4 h-4" />

              Share Article

            </button>

          </div>

        </article>

        {/* ============================================
            OTHER STORIES
        ============================================ */}

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">

          <div className="border-t border-slate-200 pt-12">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">

              <div>

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d58ad]">
                  Keep Reading
                </p>

                <h2 className="mt-3 text-3xl sm:text-4xl font-black text-[#243f57]">
                  Other Stories
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/news-features"
                  )
                }
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0d58ad] hover:gap-3 transition-all"
              >

                View All Stories

                <ArrowRight className="w-4 h-4" />

              </button>

            </div>

            {relatedLoading ? (

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {[1, 2, 3].map(
                  (item) => (

                    <div
                      key={item}
                      className="animate-pulse"
                    >

                      <div className="aspect-[16/10] bg-slate-200 rounded-2xl" />

                      <div className="mt-5 h-4 bg-slate-200 rounded w-24" />

                      <div className="mt-4 h-7 bg-slate-200 rounded w-full" />

                      <div className="mt-3 h-4 bg-slate-200 rounded w-4/5" />

                    </div>

                  )
                )}

              </div>

            ) : relatedStories.length >
              0 ? (

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {relatedStories.map(
                  (
                    relatedStory
                  ) => (

                    <article
                      key={
                        relatedStory.id
                      }
                      onClick={() =>
                        openRelatedStory(
                          relatedStory.id
                        )
                      }
                      className="group cursor-pointer"
                    >

                      {/* IMAGE */}

                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">

                        {relatedStory.image ? (

                          <img
                            src={
                              relatedStory.image
                            }
                            alt={
                              relatedStory.title
                            }
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />

                        ) : (

                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                            No image
                          </div>

                        )}

                      </div>

                      {/* CONTENT */}

                      <div className="pt-5">

                        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#0d58ad]">

                          {relatedStory.category ||
                            relatedStory.label ||
                            "News"}

                        </span>

                        <h3 className="mt-3 text-xl sm:text-2xl font-bold leading-tight text-[#243f57] group-hover:text-[#0d58ad] transition-colors">

                          {
                            relatedStory.title
                          }

                        </h3>

                        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-7 line-clamp-2">

                          {relatedStory.shortArticle ||
                            relatedStory.description ||
                            "Read this story for more information."}

                        </p>

                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">

                          <Calendar className="w-3.5 h-3.5" />

                          {relatedStory.date ||
                            "No date"}

                        </div>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0d58ad] group-hover:gap-3 transition-all">

                          Read Story

                          <ArrowRight className="w-4 h-4" />

                        </div>

                      </div>

                    </article>

                  )
                )}

              </div>

            ) : (

              <div className="py-12 text-center border-y border-slate-200">

                <p className="text-slate-500">
                  No other stories available.
                </p>

              </div>

            )}

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}
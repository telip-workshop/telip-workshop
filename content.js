(function () {
  function fillText(selector, value) {
    if (value == null) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  function fillHtml(selector, value) {
    if (value == null) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.innerHTML = value;
    });
  }

  var FAQ_ICONS = {
    what: '<svg class="about-faq__icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.75"/><path fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" d="M12 11v5M12 8h.01"/></svg>',
    aim: '<svg class="about-faq__icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.75"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.75"/><circle cx="12" cy="12" r="1.25" fill="currentColor"/></svg>',
    who: '<svg class="about-faq__icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.75"/><path fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6M16 11h5M18.5 8.5v5"/></svg>',
    format: '<svg class="about-faq__icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.75"/><path fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" d="M8 10h8M8 14h5"/></svg>'
  };

  function fillAboutFaq(selector, items) {
    if (!items || !items.length) return;
    document.querySelectorAll(selector).forEach(function (container) {
      container.innerHTML =
        '<div class="about-faq__panel">' +
        '<p class="about-faq__eyebrow">At a glance</p>' +
        '<div class="about-faq__grid" role="list">' +
        items
          .map(function (item, index) {
            var iconKey = item.icon || ['what', 'aim', 'format', 'who'][index];
            var iconHtml = FAQ_ICONS[iconKey] || FAQ_ICONS.what;
            var indexLabel = String(index + 1).padStart(2, '0');
            return (
              '<article class="about-faq__item" role="listitem">' +
              '<div class="about-faq__head">' +
              '<span class="about-faq__index" aria-hidden="true">' +
              indexLabel +
              '</span>' +
              iconHtml +
              '</div>' +
              '<div class="about-faq__copy">' +
              '<h3 class="about-faq__question">' +
              escapeHtml(item.question) +
              '</h3>' +
              '<div class="about-faq__answer">' +
              item.answer +
              '</div></div></article>'
            );
          })
          .join('') +
        '</div></div>';
    });
  }

  function buildSurveyCtaLink(link, variant) {
    if (!link || !link.label) return '';
    var href = link.href && link.href.trim();
    var className = 'survey-cta__link';
    if (variant === 'outline') className += ' survey-cta__link--outline';
    if (href) {
      return (
        '<a class="' +
        className +
        '" href="' +
        escapeHtml(href) +
        '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(link.label) +
        '<span class="survey-cta__arrow" aria-hidden="true">→</span></a>'
      );
    }
    return (
      '<span class="' +
      className +
      ' survey-cta__link--disabled">' +
      escapeHtml(link.label) +
      '</span>'
    );
  }

  function fillAboutSurvey(selector, survey) {
    if (!survey) return;
    document.querySelectorAll(selector).forEach(function (el) {
      var actionLinks = [
        buildSurveyCtaLink(survey.link, 'primary'),
        buildSurveyCtaLink(survey.registrationLink, 'outline')
      ].filter(Boolean);
      var actionsHtml = actionLinks.length
        ? '<div class="survey-cta__actions">' + actionLinks.join('') + '</div>'
        : '';
      var noteHtml = survey.note
        ? '<p class="survey-cta__note">' + escapeHtml(survey.note) + '</p>'
        : '';
      el.innerHTML =
        '<div class="survey-cta__inner">' +
        '<div class="survey-cta__content">' +
        (survey.eyebrow
          ? '<p class="survey-cta__eyebrow">' + escapeHtml(survey.eyebrow) + '</p>'
          : '') +
        '<h3 class="survey-cta__title">' +
        escapeHtml(survey.title) +
        '</h3>' +
        '<p class="survey-cta__text">' +
        escapeHtml(survey.text) +
        '</p>' +
        noteHtml +
        '</div>' +
        '<div class="survey-cta__action">' +
        actionsHtml +
        '</div></div>';
    });
  }

  function fillAboutDescription(selector, description) {
    if (!description) return;
    var paragraphs = description.paragraphs || [];
    document.querySelectorAll(selector).forEach(function (el) {
      var titleHtml = description.title
        ? '<h2 id="motivation">' + escapeHtml(description.title) + '</h2>'
        : '';
      var bodyHtml = paragraphs
        .map(function (text) {
          return '<p>' + escapeHtml(text) + '</p>';
        })
        .join('');
      el.innerHTML = titleHtml + bodyHtml;
    });
  }

  function fillList(selector, items, html) {
    var list = document.querySelector(selector);
    if (!list || !items) return;
    list.innerHTML = items
      .map(function (item) {
        return html ? '<li>' + item + '</li>' : '<li>' + escapeHtml(item) + '</li>';
      })
      .join('');
  }

  function fillQuestionList(selector, items) {
    var list = document.querySelector(selector);
    if (!list || !items) return;
    list.innerHTML = items
      .map(function (text) {
        return '<li><span class="item-list__badge" aria-hidden="true">?</span>' + escapeHtml(text) + '</li>';
      })
      .join('');
  }

  function fillAgendaSteps(selector, items) {
    var list = document.querySelector(selector);
    if (!list || !items) return;
    list.innerHTML = items
      .map(function (item) {
        return '<li>' + item + '</li>';
      })
      .join('');
  }

  function buildInlineSurveyLink(link) {
    var text = 'survey';
    var href = link && (link.href || '').trim();
    if (href) {
      return (
        '<a href="' +
        escapeHtml(href) +
        '" target="_blank" rel="noopener noreferrer">' +
        text +
        '</a>'
      );
    }
    return (
      '<a class="survey-inline-link survey-inline-link--pending" href="#survey">' +
      text +
      '</a>'
    );
  }

  function fillParticipationIntro(intro, surveyLink) {
    if (intro == null) return;
    var html = String(intro).replace(
      '{{surveyLink}}',
      buildInlineSurveyLink(surveyLink)
    );
    fillHtml('[data-fill="participation.intro"]', html);
  }

  function fillOutcomes(selector, items) {
    var grid = document.querySelector(selector);
    if (!grid || !items) return;
    grid.innerHTML = items
      .map(function (item, index) {
        var num = String(index + 1);
        return (
          '<article class="outcome-card">' +
          '<span class="outcome-card__num" aria-hidden="true">' +
          num +
          '</span>' +
          '<h3 class="outcome-card__title">' +
          escapeHtml(item.title) +
          '</h3>' +
          '<p class="outcome-card__text">' +
          escapeHtml(item.text) +
          '</p></article>'
        );
      })
      .join('');
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fillMetaLine(items) {
    var list = document.querySelector('[data-fill="header.meta"]');
    if (!list || !items) return;
    list.innerHTML = items
      .map(function (item) {
        if (typeof item === 'string') {
          return '<li class="meta-item">' + escapeHtml(item) + '</li>';
        }
        var kind = item.kind || 'default';
        if (kind === 'actions' && item.items && item.items.length) {
          return (
            '<li class="meta-item meta-actions" role="presentation">' +
            '<div class="meta-actions__group" role="group" aria-label="Quick links">' +
            item.items
              .map(function (action) {
                var href = action.href && action.href.trim();
                if (!href || !action.label) return '';
                return (
                  '<a class="meta-btn" href="' +
                  escapeHtml(href) +
                  '" target="_blank" rel="noopener noreferrer">' +
                  escapeHtml(action.label) +
                  '</a>'
                );
              })
              .join('') +
            '</div></li>'
          );
        }
        var label = item.label
          ? '<span class="meta-label">' + escapeHtml(item.label) + '</span>'
          : '';
        return (
          '<li class="meta-item meta-' +
          escapeHtml(kind) +
          '">' +
          label +
          '<span class="meta-value">' +
          escapeHtml(item.text) +
          '</span></li>'
        );
      })
      .join('');
  }

  function fillLogoLink(selector, link) {
    var el = document.querySelector(selector);
    if (!el || !link) return;
    el.href = link.href;
    var img = el.querySelector('img');
    if (link.logo && img) {
      img.src = link.logo.src;
      img.alt = link.logo.alt;
    } else if (link.label) {
      el.textContent = link.label;
    }
  }

  function fillNavExternal(link) {
    fillLogoLink('[data-fill="header.navExternal"]', link);
  }

  function fillOrganisers(people) {
    var grid = document.querySelector('[data-fill="organisers.people"]');
    if (!grid || !people) return;
    grid.innerHTML = people
      .map(function (person) {
        var photoSrc = person.photo || '';
        var photoAlt = person.name ? person.name + ', workshop organiser' : '';
        var photoHtml = photoSrc
          ? '<img class="organiser-photo" src="' +
            escapeHtml(photoSrc) +
            '" alt="' +
            escapeHtml(photoAlt) +
            '" width="168" height="168" loading="lazy" decoding="async">'
          : '<div class="organiser-photo organiser-photo--placeholder" aria-hidden="true"></div>';

        var countryHtml = person.country
          ? '<p class="organiser-country">' + escapeHtml(person.country) + '</p>'
          : '';

        var emailHtml = person.email
          ? '<div class="organiser-links">' +
            '<a class="organiser-email" href="mailto:' +
            escapeHtml(person.email) +
            '">' +
            escapeHtml(person.email) +
            '</a></div>'
          : '';

        return (
          '<article class="organiser-card" role="listitem">' +
          '<div class="organiser-portrait">' +
          photoHtml +
          '</div>' +
          '<div class="organiser-details">' +
          '<h3 class="organiser-name">' +
          escapeHtml(person.name) +
          '</h3>' +
          countryHtml +
          '<p class="organiser-affiliation">' +
          escapeHtml(person.affiliation) +
          '</p>' +
          emailHtml +
          '</div>' +
          '</article>'
        );
      })
      .join('');
  }

  function fillAffiliations(affiliations) {
    var list = document.querySelector('[data-fill="organisers.affiliations"]');
    if (!list || !affiliations) return;
    list.innerHTML = affiliations
      .map(function (item) {
        var inner =
          '<img src="' +
          escapeHtml(item.src) +
          '" alt="' +
          escapeHtml(item.name) +
          '" loading="lazy" decoding="async">';
        if (item.href) {
          return (
            '<li><a href="' +
            escapeHtml(item.href) +
            '" target="_blank" rel="noopener noreferrer">' +
            inner +
            '</a></li>'
          );
        }
        return '<li class="affiliation-logo-item">' + inner + '</li>';
      })
      .join('');
  }

  function fillNavigation(links) {
    if (!links) return;
    document.querySelectorAll('[data-fill="navigation"]').forEach(function (container) {
      if (container.classList.contains('nav-links')) {
        container.innerHTML = links
          .map(function (link) {
            return (
              '<a href="' +
              escapeHtml(link.href) +
              '">' +
              escapeHtml(link.label) +
              '</a>'
            );
          })
          .join('');
      } else {
        container.innerHTML = links
          .map(function (link) {
            return (
              '<li><a href="' +
              escapeHtml(link.href) +
              '">' +
              escapeHtml(link.label) +
              '</a></li>'
            );
          })
          .join('');
      }
    });
  }

  function fillFooterList(selector, links, external) {
    var container = document.querySelector(selector);
    if (!container || !links) return;
    container.innerHTML = links
      .map(function (link) {
        var attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
        return (
          '<li><a href="' +
          escapeHtml(link.href) +
          '"' +
          attrs +
          '>' +
          escapeHtml(link.label) +
          '</a></li>'
        );
      })
      .join('');
  }

  function applyContent(content) {
    document.title = content.meta.title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', content.meta.description);

    fillText('[data-fill="header.title"]', content.header.title);
    fillText('[data-fill="header.subtitle"]', content.header.subtitle);
    fillMetaLine(content.header.meta);
    fillNavExternal(content.header.navExternal);

    fillText('[data-fill="about.title"]', content.about.title);
    fillAboutFaq('[data-fill="about.faq"]', content.about.faq);
    fillAboutSurvey('[data-fill="about.survey"]', content.about.survey);
    fillAboutDescription('[data-fill="about.description"]', content.about.description);

    fillText('[data-fill="goals.title"]', content.goals.title);
    fillText('[data-fill="goals.intro"]', content.goals.intro);
    fillQuestionList('[data-fill="goals.exampleQuestions"]', content.goals.exampleQuestions);

    fillText('[data-fill="participation.title"]', content.participation.title);
    fillParticipationIntro(
      content.participation.intro,
      content.about.survey && content.about.survey.link
    );
    fillText('[data-fill="participation.formatTitle"]', content.participation.formatTitle);
    fillHtml('[data-fill="participation.formatIntro"]', content.participation.formatIntro);
    fillAgendaSteps('[data-fill="participation.formatSteps"]', content.participation.formatSteps);

    fillText('[data-fill="outcomes.title"]', content.outcomes.title);
    fillHtml('[data-fill="outcomes.intro"]', content.outcomes.intro);
    fillOutcomes('[data-fill="outcomes.items"]', content.outcomes.items);

    fillText('[data-fill="organisers.title"]', content.organisers.title);
    fillText(
      '[data-fill="organisers.affiliationsTitle"]',
      content.organisers.affiliationsTitle
    );
    fillOrganisers(content.organisers.people);
    fillAffiliations(content.organisers.affiliations);

    fillText('[data-fill="contact.title"]', content.contact.title);
    fillHtml('[data-fill="contact.enquiries"]', content.contact.enquiries);

    fillText('[data-fill="footer.brand"]', content.footer.brand);
    fillText('[data-fill="footer.tagline"]', content.footer.tagline);
    fillLogoLink(
      '[data-fill="footer.conferenceLogo"]',
      content.footer.conferenceLogo
    );
    fillText('[data-fill="footer.copyright"]', content.footer.copyright);
    fillNavigation(content.navigation);
    fillFooterList('[data-fill="footer.links"]', content.footer.links, true);

    document.documentElement.classList.add('content-loaded');
    setupNavHighlight();
    setupMobileNav();
  }

  function setupMobileNav() {
    var nav = document.querySelector('.site-nav');
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('site-nav-menu');
    if (!nav || !toggle || !menu) return;

    function setMenuOpen(open) {
      nav.classList.toggle('is-menu-open', open);
      document.body.classList.toggle('nav-menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setMenuOpen(!nav.classList.contains('is-menu-open'));
    });

    menu.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenuOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 48rem)').matches) {
        setMenuOpen(false);
      }
    });
  }

  function setupNavHighlight() {
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.site-nav .nav-links a[href^="#"]')
    );
    var sections = navLinks
      .map(function (link) {
        var id = link.getAttribute('href').slice(1);
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!sections.length) return;

    function updateActiveNav() {
      var offset = 100;
      var scrollY = window.scrollY + offset;
      var current = sections[0];

      sections.forEach(function (section) {
        if (section.offsetTop <= scrollY) current = section;
      });

      navLinks.forEach(function (link) {
        link.classList.toggle(
          'is-active',
          link.getAttribute('href') === '#' + current.id
        );
      });
    }

    var nav = document.querySelector('.site-nav');

    function onScroll() {
      updateActiveNav();
      if (nav) {
        nav.classList.toggle('is-scrolled', window.scrollY > 8);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  fetch('content.json')
    .then(function (response) {
      if (!response.ok) throw new Error('Failed to load content.json');
      return response.json();
    })
    .then(applyContent)
    .catch(function (error) {
      console.error('Could not load page content:', error);
    });
})();

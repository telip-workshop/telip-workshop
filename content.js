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

  function fillList(selector, items, html) {
    var list = document.querySelector(selector);
    if (!list || !items) return;
    list.innerHTML = items
      .map(function (item) {
        return html ? '<li>' + item + '</li>' : '<li>' + escapeHtml(item) + '</li>';
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
    list.innerHTML = items.map(function (item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('');
  }

  function fillActions(actions) {
    var container = document.querySelector('[data-fill="header.actions"]');
    if (!container || !actions) return;
    container.innerHTML = actions
      .map(function (action) {
        var attrs = action.external
          ? ' target="_blank" rel="noopener noreferrer"'
          : '';
        return (
          '<a href="' +
          escapeHtml(action.href) +
          '"' +
          attrs +
          '>' +
          escapeHtml(action.label) +
          '</a>'
        );
      })
      .join('');
  }

  function fillCfpItems(items) {
    var list = document.querySelector('[data-fill="cfp.items"]');
    if (!list || !items) return;
    list.innerHTML = items
      .map(function (item) {
        return (
          '<li><strong>' +
          escapeHtml(item.label) +
          '</strong> <span>' +
          escapeHtml(item.value) +
          '</span></li>'
        );
      })
      .join('');
  }

  function fillDates(rows) {
    var tbody = document.querySelector('[data-fill="dates.rows"]');
    if (!tbody || !rows) return;
    tbody.innerHTML = rows
      .map(function (row) {
        var trClass = row.placeholder ? ' class="placeholder-row"' : '';
        var milestone = row.emphasis
          ? '<strong>' + escapeHtml(row.milestone) + '</strong>'
          : escapeHtml(row.milestone);
        var date = row.placeholder
          ? '<em>' + escapeHtml(row.date) + '</em>'
          : row.emphasis
            ? '<strong>' + escapeHtml(row.date) + '</strong>'
            : escapeHtml(row.date);
        return (
          '<tr' +
          trClass +
          '><td>' +
          milestone +
          '</td><td>' +
          date +
          '</td></tr>'
        );
      })
      .join('');
  }

  function buildContactLinks(person) {
    var parts = [];
    if (person.email) {
      parts.push(
        '<a href="mailto:' +
          escapeHtml(person.email) +
          '">Email</a>'
      );
    }
    if (person.web) {
      parts.push(
        '<a href="' +
          escapeHtml(person.web) +
          '" target="_blank" rel="noopener noreferrer">Web</a>'
      );
    }
    return parts.join(' · ');
  }

  function fillOrganisers(people) {
    var tbody = document.querySelector('[data-fill="organisers.people"]');
    if (!tbody || !people) return;
    tbody.innerHTML = people
      .map(function (person) {
        var badge = person.corresponding
          ? ' <span class="badge" title="Corresponding organiser">✔</span>'
          : '';
        return (
          '<tr><td>' +
          escapeHtml(person.name) +
          badge +
          '</td><td>' +
          escapeHtml(person.affiliation) +
          '</td><td>' +
          buildContactLinks(person) +
          '</td></tr>'
        );
      })
      .join('');
  }

  function fillFooterLinks(links) {
    var container = document.querySelector('[data-fill="footer.links"]');
    if (!container || !links) return;
    container.innerHTML = links
      .map(function (link, index) {
        var prefix = index > 0 ? ' · ' : '';
        return (
          prefix +
          '<a href="' +
          escapeHtml(link.href) +
          '">' +
          escapeHtml(link.label) +
          '</a>'
        );
      })
      .join('');
  }

  function applyContent(content) {
    document.title = content.meta.title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', content.meta.description);

    fillText('[data-fill="header.tag"]', content.header.tag);
    fillText('[data-fill="header.title"]', content.header.title);
    fillText('[data-fill="header.subtitle"]', content.header.subtitle);
    fillMetaLine(content.header.meta);
    fillActions(content.header.actions);

    fillText('[data-fill="about.title"]', content.about.title);
    fillText('[data-fill="about.lead"]', content.about.lead);
    fillHtml('[data-fill="about.conference"]', content.about.conference);
    fillText('[data-fill="about.audienceTitle"]', content.about.audienceTitle);
    fillHtml('[data-fill="about.audience"]', content.about.audience);
    fillText('[data-fill="about.outcomesTitle"]', content.about.outcomesTitle);
    fillList('[data-fill="about.outcomes"]', content.about.outcomes);
    fillText('[data-fill="about.surveyTitle"]', content.about.surveyTitle);
    fillHtml('[data-fill="about.survey"]', content.about.survey);

    fillText('[data-fill="topics.title"]', content.topics.title);
    fillText('[data-fill="topics.topicsTitle"]', content.topics.topicsTitle);
    fillList('[data-fill="topics.topics"]', content.topics.topics);
    fillText('[data-fill="topics.goalsTitle"]', content.topics.goalsTitle);
    fillList('[data-fill="topics.goals"]', content.topics.goals);

    fillText('[data-fill="format.title"]', content.format.title);
    fillHtml('[data-fill="format.intro"]', content.format.intro);
    fillList('[data-fill="format.steps"]', content.format.steps, true);
    fillText('[data-fill="format.note"]', content.format.note);

    fillText('[data-fill="cfp.title"]', content.cfp.title);
    fillText('[data-fill="cfp.lead"]', content.cfp.lead);
    fillCfpItems(content.cfp.items);
    fillHtml('[data-fill="cfp.note"]', content.cfp.note);

    fillText('[data-fill="dates.title"]', content.dates.title);
    fillDates(content.dates.rows);

    fillText('[data-fill="organisers.title"]', content.organisers.title);
    fillText('[data-fill="organisers.note"]', content.organisers.note);
    fillOrganisers(content.organisers.people);
    fillHtml('[data-fill="organisers.programmeCommittee"]', content.organisers.programmeCommittee);

    fillText('[data-fill="contact.title"]', content.contact.title);
    fillHtml('[data-fill="contact.enquiries"]', content.contact.enquiries);
    fillHtml('[data-fill="contact.venue"]', content.contact.venue);

    fillText('[data-fill="footer.line"]', content.footer.line);
    fillFooterLinks(content.footer.links);

    document.documentElement.classList.add('content-loaded');
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

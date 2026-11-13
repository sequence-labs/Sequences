export const supportEmail = "spermwhaledaily@gmail.com";

export const docs = {
  "pawrise-community": {
  "kind": "Community",
  "appName": "PawRise",
  "title": "PawRise Community Rules",
  "updated": "November 12, 2026",
  "summary": "Keep public hotels friendly. Learn what is shared and how to report, hide, block or go private.",
  "canonicalPath": "docs/pawrise/community/",
  "sections": [
    {
      "heading": "What going public shares",
      "body": [
        "Public hotel is off unless you turn it on in Community → My Profile. When it's on, anyone playing PawRise can see your hotel on Global and visit it. That includes guests who haven't signed in. They see:",
        "your @player tag and hotel name;",
        "your hotel level, room count and pet count;",
        "your hotel's look: its rooms, layout, decorations and pets;",
        "when you first went public and when your hotel was last updated.",
        "Your coins, gems, purchases, pet names, friends and the hotels you follow stay private. Following is private and one-way: nobody is told when you follow them, and there are no follower counts."
      ]
    },
    {
      "heading": "13 and older only",
      "body": [
        "Public hotels are for players 13 and older. PawRise asks Apple for your age range when it can. If Apple can't answer, you confirm your age yourself. If you're under 13, your hotel stays private, and you can still share it with accepted friends and visit public hotels."
      ]
    },
    {
      "heading": "Keep it friendly",
      "body": [
        "Choose a player tag and hotel name you'd be happy for anyone to see. No offensive, hateful, sexual or bullying names, and no names that pretend to be someone else. PawRise filters some words, but no filter catches everything, so reports matter.",
        "Levels on Global are reported by each player's game. Please don't tamper with yours. Hotels that look tampered with can be removed from Global."
      ]
    },
    {
      "heading": "Report, Hide and Block",
      "body": [
        "Every public hotel has a ⋯ menu, and a visit has its own Report and Block buttons.",
        "Report hotel sends a private report to PawRise support with the hotel's tag and the reason you chose. The other player isn't told. Reporting doesn't block anyone.",
        "Hide on this device is for guests. The hotel disappears from your lists on this device straight away. A guest report hides the hotel too.",
        "Block player needs Sign in with Apple. It removes any friendship, stops friend requests, and stops either of you from opening the other's hotel. Their hotel also leaves your Global and Following lists. You can unblock in My Profile → Blocked players."
      ]
    },
    {
      "heading": "Block isn't the same as going private",
      "body": [
        "Block stops that account opening or visiting your hotel, though its name can still appear in their lists. Guests can browse public hotels without an account, so to hide your hotel from everyone, turn Public hotel off.",
        "Turning Public hotel off takes your hotel off Global and stops public visits right away. Accepted friends can still visit if you share with them."
      ]
    },
    {
      "heading": "Moderation",
      "body": [
        "PawRise support reviews reports. The developer can remove any hotel from Global at any time, and can stop an account going public again, for example after a report, an offensive name or a level that looks tampered with. Removing a hotel from Global never touches the hotel in your game."
      ]
    },
    {
      "heading": "Contact support",
      "body": [
        "Use Report a Problem in the game's Settings, or email spermwhaledaily@gmail.com. Please include your @tag, or the @tag you're reporting, and what happened. We usually reply within 24 to 48 hours."
      ]
    }
  ]
},
  "pawrise-privacy": {
  "kind": "Privacy",
  "appName": "PawRise",
  "title": "PawRise Privacy Policy",
  "updated": "November 12, 2026",
  "summary": "How PawRise handles guest identities, gameplay analytics, private progress backups, diagnostics, support, and optional public hotels.",
  "canonicalPath": "docs/pawrise/privacy/",
  "sections": [
    {
      "heading": "Playing and guest identity",
      "body": [
        "PawRise creates an automatic guest identity through Firebase Authentication when you first connect, so you can play without signing in. This identifier connects your installation to private progress backups, support and gameplay records. Optional Sign in with Apple connects account and social features."
      ]
    },
    {
      "heading": "Gameplay analytics",
      "body": [
        "PawRise collects bounded gameplay events such as sessions, progression, room actions, rewards, purchases and feature interactions to understand play and reliability. You can turn gameplay analytics off in Settings. Analytics events contain no player names, messages or free text. They include an account or guest identifier, installation identifier, app version, build and environment."
      ]
    },
    {
      "heading": "Private hotel progress and recovery",
      "body": [
        "Private compressed hotel progress backups help the developer investigate lost progress and queue a recovery for your next connection. Backups include gameplay state and player-chosen hotel and pet names; they are separate from analytics and public hotel sharing. Routine history is scheduled to expire after about 45 days and milestone history after about 400 days. Raw analytics is scheduled to expire after about 120 days. Expiration is asynchronous, and the current backup and compiled reports have no automatic expiry."
      ]
    },
    {
      "heading": "Crash and diagnostic data",
      "body": [
        "Firebase Crashlytics collects crashes and nonfatal diagnostics in production builds to help fix reliability problems. Reports can be linked to your guest or account identifier. App diagnostic categories and breadcrumbs do not intentionally include player names, messages or player-written text."
      ]
    },
    {
      "heading": "Report a Problem and support",
      "body": [
        "Support reports include a support ID, category, app and installation details, a progress summary and an optional message you choose to send. Reports and developer notes are private and separate from gameplay analytics. The developer may inspect private backups and arrange a recovery when helping with progress problems.",
        "Reports about other players are private. A signed-in report records the reported account, the reason you choose and any short message you add. A guest's report about a public hotel is sent as a support report naming that hotel's player tag and account identifier, with the reason you choose, and it hides the hotel on your device. Reporting does not block the other player or tell them about the report. Gameplay analytics records only that a report, follow or visit happened, never the other player's name, tag or identifier."
      ]
    },
    {
      "heading": "Social features, purchases and advertising",
      "body": [
        "Optional account and friend features store your chosen player and hotel names, social relationships, blocked players, the hotels you follow and your shared hotel layout. Sharing your hotel with friends and making it public are both optional and off until you turn them on. Apple processes in-app purchases. Optional rewarded videos use Google AdMob, which may process device, advertising and diagnostic information under its own privacy policy. PawRise does not use its guest identity, gameplay analytics, backups, support reports or public hotel data for cross-app tracking."
      ]
    },
    {
      "heading": "Public hotels",
      "body": [
        "Public hotel is an optional setting for players signed in with Apple, and it is off until you turn it on. When it is on, anyone using PawRise can find your hotel on Global and visit it, including guests who have not signed in. Global shows your player tag, hotel name, hotel level, room and pet counts, a preview room, when you first went public and when your listing was last updated. Visitors see a snapshot of your hotel's look: its layout, rooms and room levels, decorations, environment, and each pet's species, sex and baby status. The snapshot contains no coins, gems, purchases, pet names, friends, follows or timers. Your game sends these details, and levels shown on Global are reported by each player's game.",
        "Public hotels are for players 13 and older. Before your first listing, PawRise asks Apple's Declared Age Range for your age range when it is available, or asks you to confirm that you are 13 or older. PawRise stores only that the check was passed and which method was used, never your birth date or exact age. If Apple reports that you are under 13, your device remembers this for that account and the hotel stays private. Following a public hotel is private: the hotels you follow are stored with your account, or only on your device if you have not signed in, and are never shown to anyone else. Blocking stores the blocked account's player and hotel names so you can manage your blocked list, and it stops either account opening the other's hotel. Reports about public hotels go privately to the developer, as described under Report a Problem and support.",
        "You can turn Public hotel off at any time in My Profile. Your Global listing and public copy are removed straight away, and public visits stop, while sharing with accepted friends is unchanged. Making your hotel private also removes the copy friends can visit. Blocking stops that account opening or visiting your hotel, though your Global listing can still appear in its lists. Turning Public hotel off is the way to hide your hotel from everyone. The developer can remove any hotel from Global, for example after a report, and can stop an account from going public again. The PawRise Community Rules at https://www.eclipsestudios.io/docs/pawrise/community/ explain reporting, hiding and blocking."
      ]
    },
    {
      "heading": "Deletion and retention",
      "body": [
        "Deleting an account in PawRise starts removal of its connected progress backups and history, raw analytics and registry records, alongside account and social data. Support reports and developer notes are not automatically erased by the current account-deletion flow; contact support to request their removal. Turning analytics off stops future gameplay analytics; it does not by itself delete existing records. Compiled aggregate reports may remain. Contact support for help with guest data or privacy requests. Local game progress remains on your device unless you remove it.",
        "Turning Public hotel off deletes your Global listing and public hotel copy at once. A small private listing record stays with your account so the game can keep your first listing date, a short relisting wait, your highest listed level and your age-check result. It is never shown to other players, and it is deleted when you delete your account. Account deletion also deletes your follows, your blocked list and your public listing. If an account is deleted from an older version of PawRise, a leftover Global row and its private listing record can remain until the developer removes them. Copies that other players' devices have already loaded may stay in their local cache until their next refresh. Reports about other players are kept as private support records. Contact support to request their removal."
      ]
    },
    {
      "heading": "Service providers and contact",
      "body": [
        "PawRise uses Google Firebase for authentication, connected data and crash reporting, and Apple for optional sign-in and purchases. Developer access to private records is restricted to operating the game, diagnosing problems and providing support. Privacy questions and deletion requests can be sent to spermwhaledaily@gmail.com."
      ]
    }
  ]
},
  "eclipse-games-terms": {
    kind: "Terms",
    appName: "Eclipse Games",
    title: "Eclipse Games Terms of Service",
    updated: "April 28, 2026",
    summary: "These terms explain how you may use Sequences, Gridlock, and Tile Tangles on the web and through Apple App Store apps.",
    canonicalPath: "docs/games/terms.html",
    legacyPath: "terms-of-service.html",
    sections: [
      {
        heading: "Acceptance",
        body: [
          "By accessing, downloading, installing, or using Sequences, Gridlock, Tile Tangles, or any related Eclipse Games web experience or Apple App Store app, you agree to these Terms of Service. If you do not agree, please do not use the games."
        ]
      },
      {
        heading: "Covered Games and Platforms",
        body: [
          "These terms apply to Eclipse Studios word games currently known as Sequences, Gridlock, and Tile Tangles.",
          "They apply whether you play through the Eclipse Studios web site, a browser-based version, or an Apple App Store app version, unless a separate product-specific term says otherwise."
        ]
      },
      {
        heading: "What the Games Provide",
        body: [
          "Sequences is a word puzzle game built around clue words, sliding solved rows, and a hidden answer.",
          "Gridlock is a word-grid game where you select letters, submit valid words, and manage tile pressure across modes such as Classic, Rush, Time Trial, and Inferno.",
          "Tile Tangles is a word puzzle where you move letters through empty parking slots to form two five-letter target words.",
          "Features may include local progress, scores, high scores, timers, hints, puzzle history, replayable puzzles, settings, and visual or gameplay updates over time."
        ]
      },
      {
        heading: "User Conduct",
        body: [
          "Use the games lawfully, respectfully, and for their intended personal entertainment purpose.",
          "Do not interfere with the games, attack the site, exploit bugs, misuse intellectual property, scrape or copy content at scale, bypass access controls, or use automation in a way that undermines the intended puzzle experience.",
          "Do not use the games or related services to harm other people, Eclipse Studios, platform providers, or third-party services."
        ]
      },
      {
        heading: "Accounts, Local Data, and Device Storage",
        body: [
          "The covered word games are designed to work without a required Eclipse Studios account unless a future feature clearly says otherwise.",
          "Game progress, scores, high scores, preferences, settings, hints, timers, and similar gameplay state may be stored locally in your browser or on your device.",
          "Eclipse Studios does not guarantee recovery of local data if you clear browser storage, delete an app, delete app data, change devices, uninstall software, or lose access to local storage."
        ]
      },
      {
        heading: "Apple App Store Terms",
        body: [
          "If you download or use an Eclipse Studios word game through the Apple App Store, Apple is the app distributor and is not a party to these terms.",
          "You are also responsible for following Apple's applicable App Store terms, rules, and usage policies.",
          "Apple has no obligation to provide maintenance or support for the games, but Apple and its subsidiaries are third-party beneficiaries of these terms where required by Apple's platform rules."
        ]
      },
      {
        heading: "Intellectual Property",
        body: [
          "Eclipse Studios owns the game designs, interfaces, artwork, code, written content, puzzle presentation, branding, and related intellectual property in the covered word games except where third-party rights apply.",
          "You may use the games for personal entertainment. You may not copy, redistribute, resell, commercially exploit, or create confusingly similar versions of the games or their content without permission."
        ]
      },
      {
        heading: "Third-Party Content and Word Lists",
        body: [
          "Some gameplay features may use bundled word lists, platform services, browser APIs, operating-system storage, or other third-party components to make the games work.",
          "Third-party materials remain subject to their own rights, licenses, and platform rules where applicable."
        ]
      },
      {
        heading: "Availability, Changes, and Support",
        body: [
          "The games are provided as is and as available. Eclipse Studios does not promise uninterrupted availability, error-free operation, permanent feature availability, or that every puzzle or mode will meet every expectation.",
          "Features, puzzles, modes, scoring, presentation, and platform support may change over time for maintenance, improvements, compatibility, legal, or platform-policy reasons.",
          `Questions or support requests can be sent to ${supportEmail}.`
        ]
      },
      {
        heading: "Privacy",
        body: [
          "The covered word games are designed around local gameplay data and minimal data handling. For details about local storage, diagnostics, third-party services, and your choices, read the Eclipse Games Privacy Policy."
        ],
        links: [{ label: "Read the Eclipse Games Privacy Policy", href: "docs/games/privacy.html" }]
      },
      {
        heading: "Limitation of Liability",
        body: [
          "To the maximum extent allowed by law, Eclipse Studios is not liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of progress, scores, data, access, or enjoyment arising from use of or inability to use the games.",
          "Some jurisdictions do not allow certain limitations, so parts of this section may not apply to you."
        ]
      },
      {
        heading: "Termination",
        body: [
          "You may stop using the games at any time.",
          "Eclipse Studios may suspend, discontinue, or limit access to the games or features where needed for maintenance, security, legal compliance, platform requirements, or misuse."
        ]
      },
      {
        heading: "Changes to These Terms",
        body: [
          "Eclipse Studios may update these terms when the games, web site, app versions, platform rules, or legal requirements change.",
          "Continued use after an update means you accept the updated terms."
        ]
      },
      {
        heading: "Contact",
        body: [`Questions about these terms can be sent to ${supportEmail}.`]
      }
    ]
  },
  "sequences-terms": {
    kind: "Terms",
    appName: "Sequences",
    title: "Sequences Terms of Service",
    updated: "April 28, 2026",
    summary: "Sequences is covered by the unified Eclipse Games Terms of Service.",
    canonicalPath: "docs/sequences/terms.html",
    legacyPath: "terms-of-service.html",
    sections: [
      {
        heading: "Unified Terms",
        body: [
          "Sequences, Gridlock, and Tile Tangles are covered by one Eclipse Games Terms of Service for web and Apple App Store app use."
        ],
        links: [{ label: "Read the Eclipse Games Terms of Service", href: "docs/games/terms.html" }]
      }
    ]
  },
  "eclipse-games-privacy": {
    kind: "Privacy",
    appName: "Eclipse Games",
    title: "Eclipse Games Privacy Policy",
    updated: "April 28, 2026",
    summary: "This policy explains how Sequences, Gridlock, and Tile Tangles handle data on the web and in Apple App Store app versions.",
    canonicalPath: "docs/games/privacy.html",
    legacyPath: "privacy-policy.html",
    sections: [
      {
        heading: "Overview",
        body: [
          "Eclipse Studios respects your privacy. This policy explains how information is handled when you use Sequences, Gridlock, Tile Tangles, or related Eclipse Games experiences on the web or through Apple App Store apps.",
          "The covered word games are designed around local play and minimal data handling. Eclipse Studios does not sell personal data and does not share personal data for cross-context behavioral advertising."
        ]
      },
      {
        heading: "Covered Games and Platforms",
        body: [
          "This policy covers Sequences, Gridlock, and Tile Tangles.",
          "It applies to browser-based web versions, Eclipse Studios web pages used to play those games, and Apple App Store app versions unless a separate product-specific policy says otherwise."
        ]
      },
      {
        heading: "Information Stored Locally",
        body: [
          "The games may store gameplay information locally on your device or in your browser, such as puzzle progress, solved words, current game state, scores, high scores, timers, hints used, settings, preferences, mode choices, and similar gameplay data.",
          "Gridlock may store local high scores and game-state details needed for modes, scoring, word selection, timers, and tile states.",
          "Tile Tangles may store local puzzle state such as tile positions, hints, stars, move counts, timers, and mode choices.",
          "Sequences may store local puzzle progress, guesses, solved rows, selected letters, completion status, settings, and puzzle history where supported."
        ]
      },
      {
        heading: "Information Processed to Run the Games",
        body: [
          "The web versions process gameplay actions in your browser so the games can respond to taps, typing, dragging, timers, scoring, hints, and puzzle completion.",
          "Apple App Store app versions may process similar gameplay state on your device so the app can run correctly.",
          "This gameplay processing is used to provide the game experience, maintain state, improve compatibility, and troubleshoot issues."
        ]
      },
      {
        heading: "Diagnostics and Technical Information",
        body: [
          "The games may use limited technical information needed for crash troubleshooting, performance improvement, security, compatibility, and platform operation.",
          "Technical information may include device or browser type, operating-system version, app version, error details, performance information, or similar diagnostics when provided by the platform or configured app services.",
          "Eclipse Studios uses this information to operate, secure, troubleshoot, and improve the games."
        ]
      },
      {
        heading: "Accounts, Advertising, and Sale of Data",
        body: [
          "The covered word games are designed to work without a required Eclipse Studios account unless a future feature clearly says otherwise.",
          "Eclipse Studios does not use third-party advertising in the covered word games.",
          "Eclipse Studios does not sell personal data.",
          "Eclipse Studios does not share personal data for cross-context behavioral advertising."
        ]
      },
      {
        heading: "Third-Party Services",
        body: [
          "The games may rely on platform or infrastructure services needed for app distribution, hosting, diagnostics, security, storage, or compatibility.",
          "Web versions are hosted as static web pages and may be served through GitHub Pages or similar hosting infrastructure.",
          "Apple App Store app versions may use Apple platform services for distribution, app updates, crash reports, diagnostics, device storage, and App Store functionality according to your Apple settings and Apple's policies.",
          "If infrastructure services such as Firebase are used in a future or app-specific feature, they should be used only for the limited purpose described by that feature and platform configuration. Where retention applies to Firebase-backed data, the current policy target is limited retention of up to 90 days."
        ]
      },
      {
        heading: "Data Sharing",
        body: [
          "Eclipse Studios does not sell personal data and does not share personal data for cross-context behavioral advertising.",
          "Limited technical information may be processed by platform, hosting, diagnostics, or infrastructure providers only as needed to operate, secure, troubleshoot, distribute, or improve the games.",
          "Eclipse Studios may disclose information if required to comply with law, protect rights, investigate misuse, or maintain security."
        ]
      },
      {
        heading: "Your Choices and Controls",
        body: [
          "You can remove locally stored web gameplay data by clearing browser storage for the site, using browser privacy controls, or using any in-game reset controls that may be available.",
          "You can remove locally stored app gameplay data by deleting the app, clearing app data where your platform supports it, or using any in-app reset controls that may be available.",
          "You can control Apple diagnostics and analytics sharing through your Apple device settings."
        ]
      },
      {
        heading: "Children's Privacy",
        body: [
          "The covered word games are designed to avoid collecting personal information from children.",
          "If you believe a child provided personal information through a related support channel, contact Eclipse Studios so we can help."
        ]
      },
      {
        heading: "International Users",
        body: [
          "If you use the games from outside the United States, information may be processed in the United States or other locations where platform, hosting, diagnostic, or infrastructure providers operate.",
          "Where privacy laws provide specific rights, you may contact Eclipse Studios to ask questions or request help with access, deletion, or correction where applicable."
        ]
      },
      {
        heading: "Changes to This Policy",
        body: [
          "Eclipse Studios may update this policy when the games, web site, app versions, platform rules, or legal requirements change.",
          "If new features materially change data practices, this policy should be updated before or when those features are released."
        ]
      },
      {
        heading: "Contact",
        body: [`Privacy questions can be sent to ${supportEmail}.`]
      }
    ]
  },
  "sequences-privacy": {
    kind: "Privacy",
    appName: "Sequences",
    title: "Sequences Privacy Policy",
    updated: "April 28, 2026",
    summary: "Sequences is covered by the unified Eclipse Games Privacy Policy.",
    canonicalPath: "docs/sequences/privacy.html",
    legacyPath: "privacy-policy.html",
    sections: [
      {
        heading: "Unified Privacy Policy",
        body: [
          "Sequences, Gridlock, and Tile Tangles are covered by one Eclipse Games Privacy Policy for web and Apple App Store app use."
        ],
        links: [{ label: "Read the Eclipse Games Privacy Policy", href: "docs/games/privacy.html" }]
      }
    ]
  },
  "spy-privacy": {
    kind: "Privacy",
    appName: "Spy",
    title: "Spy Privacy Policy",
    updated: "October 20, 2025",
    summary: "Spy is an offline pass-the-phone party game with no accounts, ads, analytics, or internet requirement.",
    canonicalPath: "docs/spy/privacy.html",
    legacyPath: "spy-privacy-policy.html",
    sections: [
      {
        heading: "Summary",
        body: [
          "Spy is an offline pass-the-phone party game.",
          "Eclipse Studios does not collect, track, sell, or share personal data through Spy.",
          "Spy does not use accounts, analytics, ads, or internet connectivity."
        ]
      },
      {
        heading: "What Spy Does Not Collect",
        body: [
          "Spy does not collect names, email addresses, phone numbers, contact lists, location data, device identifiers, advertising identifiers, usage analytics, crash analytics, or diagnostics sent to Eclipse Studios or third parties."
        ]
      },
      {
        heading: "Local Data",
        body: [
          "Spy may store local game settings, selected game options, or temporary gameplay state on your device.",
          "This information stays on your device and can be removed by clearing app data where your platform supports it or by deleting the app."
        ]
      },
      {
        heading: "Network, Accounts, Payments, and Permissions",
        body: [
          "Spy does not require network connectivity, user accounts, in-app payments, or subscriptions.",
          "Spy does not request sensitive permissions such as camera, microphone, contacts, photos, location, Bluetooth, or push notifications."
        ]
      },
      {
        heading: "Children's Privacy",
        body: [
          "Because Spy does not collect personal information, Eclipse Studios does not knowingly collect personal information from children through the app."
        ]
      },
      {
        heading: "International Users and Legal Basis",
        body: [
          "Spy does not process personal data. If privacy laws such as GDPR, UK GDPR, or CCPA apply, the relevant basis is that the app does not process personal data."
        ]
      },
      {
        heading: "Changes and Contact",
        body: [
          "If Eclipse Studios adds features that change Spy's data practices, this policy will be updated before or when those features are released.",
          `Questions can be sent to ${supportEmail}.`
        ]
      }
    ]
  },
  "patchit-privacy": {
    kind: "Privacy",
    appName: "PatchIt",
    title: "PatchIt Privacy Policy",
    updated: "April 29, 2025",
    summary: "PatchIt uses limited data needed to report potholes and road issues while avoiding user profiles and personally identifiable information.",
    canonicalPath: "docs/patchit/privacy.html",
    legacyPath: "patchit-privacy-policy.html",
    sections: [
      {
        heading: "Overview",
        body: [
          "PatchIt is developed and maintained by Eclipse Studios. This policy explains how information is handled when you use PatchIt to report potholes and road issues.",
          "PatchIt is designed to collect only the information needed for location-based reporting features."
        ]
      },
      {
        heading: "Information PatchIt Collects",
        body: [
          "PatchIt may use location only when you are actively reporting a pothole or road issue.",
          "PatchIt may collect device type and operating system version for app optimization.",
          "PatchIt may use anonymized crash and performance analytics to improve stability and user experience."
        ]
      },
      {
        heading: "How Information Is Used",
        body: [
          "Location is used to pin pothole and road issue reports accurately on the map.",
          "Device and performance information is used to maintain stability, fix bugs, and improve the app."
        ]
      },
      {
        heading: "Storage and Security",
        body: [
          "PatchIt does not collect personally identifiable information for reports.",
          "Reports are intended to be anonymous and stored without user identity.",
          "Location is accessed only when actively reporting.",
          "Transmissions use industry-standard encryption where data is sent from the app."
        ]
      },
      {
        heading: "Third-Party Services",
        body: [
          "PatchIt may use Apple Maps for map display.",
          "PatchIt may use Firebase for backend and data storage."
        ]
      },
      {
        heading: "Children's Privacy",
        body: [
          "PatchIt is not intended for children under 13. Eclipse Studios does not knowingly collect data from children through PatchIt."
        ]
      },
      {
        heading: "Your Choices",
        body: [
          "You can uninstall PatchIt at any time, which deletes local app data from your device.",
          "Eclipse Studios does not maintain user profiles for PatchIt reports."
        ]
      },
      {
        heading: "Contact",
        body: [`Questions or concerns can be sent to ${supportEmail}.`]
      }
    ]
  },
  "push-the-button-privacy": {
    kind: "Privacy",
    appName: "Push The Button",
    title: "Push The Button Privacy Policy",
    updated: "May 7, 2026",
    summary: "Push The Button is a fictional social debate experience that does not ask for names, email, contacts, location, payment information, or social accounts.",
    canonicalPath: "docs/push-the-button/privacy.html",
    sections: [
      {
        heading: "Overview",
        body: [
          "Push The Button is a fictional social debate experience from Eclipse Studios.",
          "The app is designed to avoid asking for your name, email address, contacts, location, payment information, or social account."
        ]
      },
      {
        heading: "Information Push The Button Does Not Ask For",
        body: [
          "Push The Button does not ask you to create an account.",
          "Push The Button does not ask for your name, email address, phone number, contact list, precise location, payment information, or social media account.",
          "Push The Button does not require you to sign in with Apple, Google, Facebook, or another social provider."
        ]
      },
      {
        heading: "Vote Data",
        body: [
          "If a backend is enabled, Push The Button may submit vote data so the app can count submissions and reveal the fictional debate result after the scheduled reveal time.",
          "Vote data is used only to count submissions, operate the debate experience, prevent obvious duplicate or invalid submissions where technically necessary, and show the final fictional result.",
          "Vote data is not intended to identify you personally."
        ]
      },
      {
        heading: "Device and Technical Information",
        body: [
          "Push The Button may process limited technical information needed to run the app, deliver app updates, host backend features, troubleshoot crashes, prevent abuse, and maintain security.",
          "This may include app version, device or operating-system version, browser or network request information for web use, crash details, or similar diagnostics provided by Apple, hosting providers, or infrastructure services."
        ]
      },
      {
        heading: "How Information Is Used",
        body: [
          "Eclipse Studios uses information from Push The Button to run the fictional debate experience, count votes, reveal scheduled results, troubleshoot problems, improve reliability, maintain security, and respond to support requests.",
          "Eclipse Studios does not use Push The Button vote data to build personal profiles."
        ]
      },
      {
        heading: "Sharing and Sale of Data",
        body: [
          "Eclipse Studios does not sell personal data from Push The Button.",
          "Eclipse Studios does not share Push The Button data for cross-context behavioral advertising.",
          "Limited technical information may be processed by platform, hosting, diagnostics, or infrastructure providers only as needed to operate, secure, troubleshoot, distribute, or improve the app."
        ]
      },
      {
        heading: "Local Storage and Retention",
        body: [
          "Push The Button may store local app state or settings on your device so the experience works correctly.",
          "If backend vote collection is enabled, vote records may be retained for as long as needed to count submissions, reveal the scheduled result, maintain integrity, troubleshoot issues, and operate the feature.",
          "You can remove local app data by deleting the app or clearing site or app storage where your platform supports it."
        ]
      },
      {
        heading: "Children's Privacy",
        body: [
          "Push The Button is designed to avoid asking for personal information from children.",
          "If you believe a child provided personal information through a support channel or app feature, contact Eclipse Studios so we can help."
        ]
      },
      {
        heading: "Changes to This Policy",
        body: [
          "Eclipse Studios may update this policy if Push The Button changes, if backend behavior changes, or if legal or platform requirements change.",
          "If future features materially change data practices, this policy should be updated before or when those features are released."
        ]
      },
      {
        heading: "Contact",
        body: [`Privacy questions can be sent to ${supportEmail}.`]
      }
    ]
  },
  support: {
    kind: "Support",
    appName: "Eclipse Studios",
    title: "Eclipse Studios Support",
    updated: "Current",
    summary: "Get help with Sequences, Spy, PatchIt, or Eclipse Studios documents.",
    canonicalPath: "docs/support.html",
    legacyPath: "user-support.html",
    sections: [
      {
        heading: "Contact Support",
        body: [
          `For questions, feedback, or support requests, email ${supportEmail}.`,
          "Please include the app name, device or platform, and a short description of what happened so we can help faster."
        ],
        links: [{ label: "Email Eclipse Studios Support", href: `mailto:${supportEmail}` }]
      },
      {
        heading: "Response Time",
        body: [
          "Eclipse Studios typically responds to support requests within 24 to 48 hours when possible."
        ]
      }
    ]
  }
};

export const docGroups = [
  { appName: "PawRise", summary: "Pet hotel privacy and community rules.", links: ["pawrise-privacy", "pawrise-community"] },
  {
    appName: "Eclipse Games",
    summary: "Unified policies and terms for Sequences, Gridlock, and Tile Tangles.",
    links: ["eclipse-games-terms", "eclipse-games-privacy"]
  },
  {
    appName: "Spy",
    summary: "Offline party game privacy policy.",
    links: ["spy-privacy"]
  },
  {
    appName: "PatchIt",
    summary: "Road issue reporting privacy policy.",
    links: ["patchit-privacy"]
  },
  {
    appName: "Push The Button",
    summary: "Fictional social debate privacy policy.",
    links: ["push-the-button-privacy"]
  },
  {
    appName: "Support",
    summary: "One support channel for Eclipse Studios apps.",
    links: ["support"]
  }
];

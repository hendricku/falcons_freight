export const site = {
  name: 'A Plus Falcons Freight Inc.',
  shortName: 'A Plus Falcons',
  email: 'inquiry@falconslogistics-ph.com',
  phone: '+63 (2) 5310 4083',
  phoneAlt: '+63 (2) 7004 7583',
  phoneHref: 'tel:+63253104083',
  address: 'Suites 608 & 400, Ermita Center Building, Roxas Boulevard, Ermita, Manila, Philippines',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.falconslogistics-ph.com',
};

// Temporary reference photography from Unsplash. Replace with licensed/client-approved
// local files before production if possible. See MEDIA-MIGRATION.md.
export const photos = {
  hero: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=2200&q=85',
  port: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1400&q=85',
  ship: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1400&q=85',
  air: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=85',
  truck: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1400&q=85',
  warehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85',
  containers: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=1400&q=85',
  document: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85',
  people: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85',
  skyline: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1400&q=85',
};

export type Service = {
  slug: string; title: string; eyebrow: string; intro: string; description: string;
  image: string; icon: string; features: string[]; process: {title: string; detail: string}[];
  note: string;
};
export const services: Service[] = [
  {
    slug: 'sea-freight', title: 'Sea Freight', eyebrow: 'OCEAN TRANSPORT',
    intro: 'Move goods across oceans with clarity at every step.',
    description: 'From container planning to arrival coordination, our sea freight team helps businesses manage the moving parts of international ocean shipments. Tell us where your cargo needs to go and we will help identify an appropriate approach.',
    image: photos.port, icon: 'ship',
    features: ['Containerized cargo coordination', 'Full container and consolidated freight inquiries', 'Import and export shipment planning', 'Documentation and arrival coordination'],
    process: [{title:'Understand your shipment',detail:'We review the origin, destination, cargo dimensions and preferred schedule.'},{title:'Plan the movement',detail:'Our team discusses suitable ocean-freight arrangements and the documents involved.'},{title:'Coordinate execution',detail:'Relevant transport parties and milestones are aligned for the shipment.'},{title:'Support the next step',detail:'We discuss arrival arrangements, handling and inland movement where required.'}],
    note: 'Transit times, routes and container availability vary by shipment and should be confirmed with our team.'
  },
  {
    slug: 'air-freight', title: 'Air Freight', eyebrow: 'TIME-SENSITIVE CARGO',
    intro: 'For cargo that needs a more time-conscious route.',
    description: 'Air freight connects businesses to international markets when timing matters. Our team can discuss shipment requirements, routing options, documentation and cargo handling considerations.',
    image: photos.air, icon: 'plane',
    features: ['International air freight inquiries', 'Time-sensitive shipment coordination', 'Cargo documentation support', 'Airport-to-destination planning'],
    process: [{title:'Share the details',detail:'Provide cargo nature, dimensions, weight and preferred dates.'},{title:'Review the options',detail:'We discuss available air freight arrangements suitable for the cargo.'},{title:'Prepare documentation',detail:'Relevant shipping paperwork and handling needs are identified.'},{title:'Coordinate delivery',detail:'Arrival and onward movement can be discussed as part of the shipment plan.'}],
    note: 'Acceptance, availability and flight schedules are subject to carrier and cargo requirements.'
  },
  {
    slug: 'land-transportation', title: 'Land Transportation', eyebrow: 'INLAND MOVEMENT',
    intro: 'The essential connection between ports, warehouses and destinations.',
    description: 'Transport planning does not end at the port. We support conversations around inland cargo movement, delivery requirements and the coordination needed for a practical end-to-end solution.',
    image: photos.truck, icon: 'truck',
    features: ['Domestic trucking inquiries', 'Port-to-site movement coordination', 'Cargo pickup and delivery planning', 'Equipment and load requirement review'],
    process: [{title:'Define the route',detail:'We collect pickup and delivery locations and timing constraints.'},{title:'Review the cargo',detail:'Cargo weight, dimensions and access conditions help shape the plan.'},{title:'Confirm arrangements',detail:'Relevant transport requirements are agreed before movement.'},{title:'Manage handoff',detail:'Pickup and destination handoff requirements are coordinated.'}],
    note: 'Specific vehicle types, coverage and current fleet capacity require confirmation before quotation.'
  },
  {
    slug: 'customs-clearance', title: 'Customs Clearance', eyebrow: 'TRADE DOCUMENTATION',
    intro: 'Navigate important border formalities with the right support.',
    description: 'Cross-border shipments involve customs processes and regulatory requirements. Share the nature of your goods and our team can help identify the documentation and clearance support needed for your shipment.',
    image: photos.document, icon: 'file',
    features: ['Import and export inquiry support', 'Document requirement coordination', 'Customs process guidance', 'Shipment information review'],
    process: [{title:'Understand the cargo',detail:'Product details, origin and intended use are reviewed.'},{title:'Check requirements',detail:'Potential documents and procedural steps are identified.'},{title:'Coordinate processing',detail:'Appropriate clearance arrangements are discussed.'},{title:'Plan release',detail:'Next transport or delivery steps are aligned where applicable.'}],
    note: 'Regulatory decisions, assessments and release remain subject to the relevant authorities.'
  },
  {
    slug: 'warehousing', title: 'Warehousing & Distribution', eyebrow: 'CARGO HANDLING',
    intro: 'Keep your goods moving through the spaces between shipments.',
    description: 'When cargo needs storage, handling or onward distribution, an organized plan matters. Our team can discuss warehousing and distribution requirements as part of a broader logistics solution.',
    image: photos.warehouse, icon: 'boxes',
    features: ['Storage requirement assessment', 'Warehouse-handling inquiries', 'Inventory and cargo handoff planning', 'Distribution coordination'],
    process: [{title:'Outline your needs',detail:'We establish cargo type, volume, duration and handling needs.'},{title:'Assess arrangements',detail:'Storage and distribution options are discussed based on requirements.'},{title:'Coordinate handling',detail:'Receipt, handling and dispatch expectations are clarified.'},{title:'Plan onward movement',detail:'Distribution or final delivery can be incorporated where appropriate.'}],
    note: 'Warehouse facilities, location, terms and availability must be confirmed with the company.'
  },
  {
    slug: 'permits-licensing', title: 'Permits & Licensing', eyebrow: 'REGULATORY SUPPORT',
    intro: 'Make document-heavy shipments easier to navigate.',
    description: 'Some shipments require additional permits, approvals or supporting paperwork. We can help begin the conversation about the documents and agency processes relevant to your goods.',
    image: photos.containers, icon: 'shield',
    features: ['Shipping permit inquiries', 'Trade-document coordination', 'Agency requirement review', 'Regulatory workflow guidance'],
    process: [{title:'Identify the goods',detail:'We gather a clear description, purpose and shipment route.'},{title:'Discuss requirements',detail:'We identify potential permit or licensing checkpoints.'},{title:'Prepare next steps',detail:'The necessary contacts and supporting documents are discussed.'},{title:'Coordinate follow-through',detail:'Requirements are aligned with the broader shipment workflow.'}],
    note: 'Permit eligibility and issuance are determined by the responsible government authorities.'
  },
];

export type Article = {slug: string; title: string; date: string; read: string; category: string; image: string; excerpt: string; summary: string[]; originalUrl: string};
export const articles: Article[] = [
  {
    slug:'china-market-update', title:'China Market Update!', date:'June 24, 2024', read:'2 min read', category:'Market Updates', image:photos.containers,
    excerpt:'A look at the supply-and-demand pressures affecting ocean freight capacity and costs in 2024.',
    summary:['Originally published in June 2024, this market note examines the pressures facing container shipping routes as disruptions and shifting trade flows affected available capacity.','It discusses the consequences of longer voyages, equipment repositioning and heightened shipment demand across several trade lanes. The article also illustrates how quickly freight market conditions can change.','For current rates, sailing schedules or a routing discussion, contact the Falcons team. Historical market commentary should not be treated as a real-time quote.'],
    originalUrl:'https://www.falconslogistics-ph.com/post/china-market-update'
  },
  {
    slug:'baltimore-bridge-collapse-analyzing-insurance-coverage-and-implications-for-the-logistics-industry',title:'Baltimore Bridge Collapse: Analyzing Insurance Coverage and Implications for the Logistics Industry',date:'June 24, 2024',read:'3 min read',category:'Industry Insights',image:photos.ship,
    excerpt:'What a major infrastructure disruption can teach supply chains about resilience, liability and risk planning.',
    summary:['The original article considers the logistics implications of the Francis Scott Key Bridge collapse in Baltimore in 2024.','It reviews the different layers of risk that can arise when a shipping incident affects major infrastructure: physical assets, vessels, cargo, third-party losses and interrupted commercial operations.','The broader takeaway is a practical one: resilient shipping plans depend on route alternatives, insurance reviews, reliable communication and well-understood responsibilities. This summary is informational, not legal or insurance advice.'],
    originalUrl:'https://www.falconslogistics-ph.com/post/baltimore-bridge-collapse-analyzing-insurance-coverage-and-implications-for-the-logistics-industry'
  },
  {
    slug:'a-plus-falcons-freight-inc-takes-flight-at-wca-dubai-conference',title:'A Plus Falcons Freight Inc. Takes Flight at WCA Dubai Conference',date:'June 24, 2024',read:'2 min read',category:'Company News',image:photos.skyline,
    excerpt:'A snapshot of the company’s participation in an international logistics networking event.',
    summary:['The original company announcement discusses A Plus Falcons Freight Inc.’s participation in the WCA Dubai Conference.','It identifies company representatives who attended the event and describes discussions with international logistics professionals around partnerships, collaboration and the changing freight landscape.','International relationships are an important part of coordinating complex freight movements. Specific present-day memberships and service coverage should be confirmed directly with the company.'],
    originalUrl:'https://www.falconslogistics-ph.com/post/a-plus-falcons-freight-inc-takes-flight-at-wca-dubai-conference'
  },
  {
    slug:'a-plus-falcons-freight-inc-soars-to-new-heights-with-the-acquisition-of-two-state-of-the-art-trucks',title:'A Plus Falcons Freight Inc. Soars to New Heights with the Acquisition of Two State-of-the-Art Trucks',date:'May 9, 2024',read:'2 min read',category:'Company News',image:photos.truck,
    excerpt:'The company’s 2024 announcement about expanding its trucking operations.',
    summary:['In May 2024, A Plus Falcons Freight Inc. announced that it had added two vehicles to its fleet. The announcement reported a fleet total of three at the time.','The update highlighted the role of trucking in linking different parts of an end-to-end shipping movement, including unloading, handling and inland delivery.','The numbers refer specifically to the historical announcement and are not presented as the company’s current fleet size.'],
    originalUrl:'https://www.falconslogistics-ph.com/post/a-plus-falcons-freight-inc-soars-to-new-heights-with-the-acquisition-of-two-state-of-the-art-trucks'
  },
];

// Visual capability narratives only. No client names, metrics or completed-project
// outcomes are asserted until client-owned case-study material is received.
export const projects = [
  {slug:'port-and-ocean-operations',title:'Port & Ocean Operations',category:'OCEAN FREIGHT',image:photos.port,description:'A visual look at the scale and coordination involved in ocean freight: vessel schedules, container movements and the port-to-destination handoff.',details:['Ocean freight is a coordination-intensive process involving shipping lines, port operations and delivery requirements.','Falcons can discuss shipment planning from the initial cargo brief through documentation and onward transportation.'],stat:'Ocean transport'},
  {slug:'inland-cargo-movement',title:'Inland Cargo Movement',category:'LAND TRANSPORTATION',image:photos.truck,description:'The critical last-mile and middle-mile connections that keep freight moving beyond terminals.',details:['Inland transportation connects ports, warehouses, factories and final destinations.','Cargo dimensions, route conditions and delivery timing are central to determining a suitable transport plan.'],stat:'Inland connections'},
  {slug:'warehouse-and-handling',title:'Cargo Handling & Storage',category:'WAREHOUSING',image:photos.warehouse,description:'Thoughtful planning for cargo while it is received, held, handled and prepared for the next movement.',details:['Warehouse and handling arrangements can affect delivery schedules, visibility and the overall customer experience.','The right approach begins with clearly defined cargo requirements, intended duration and expected handoffs.'],stat:'Cargo care'},
];

export const networks = [
  {region:'East Asia',countries:['China','Hong Kong','South Korea','Taiwan','Japan']},
  {region:'Southeast & South Asia / Oceania',countries:['Thailand','Singapore','Australia','Malaysia','India','Vietnam']},
  {region:'Europe',countries:['Italy','Turkey','France','Sweden','Germany','Spain','Netherlands']},
  {region:'North America',countries:['Canada','United States of America']},
];

export const industries = [
  {number:'01',title:'Manufacturing & Industrial',image:photos.containers,description:'For organizations coordinating components, machinery and finished goods across complex supply networks.'},
  {number:'02',title:'Retail & Consumer Goods',image:photos.warehouse,description:'For growing businesses handling replenishment, imports and the flow of goods to end markets.'},
  {number:'03',title:'Automotive & Equipment',image:photos.truck,description:'For cargo that needs careful dimensional planning, coordination and documentation.'},
  {number:'04',title:'Commercial Imports & Exports',image:photos.port,description:'For businesses managing routine shipments, trade paperwork and international handoffs.'},
];

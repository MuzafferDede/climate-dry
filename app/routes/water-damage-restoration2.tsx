import { useState } from "react";
import {
	Breadcrumb,
	Button,
	Input,
	PageNavigation,
	SectionHeader,
	Select,
} from "~/components/ui";

export const handle = {
	breadcrumb: () => [
		{ label: "Advice Hub", path: "/info-hub" },
		{ label: "Water Damage Restoration", path: "/water-damage-restoration" },
	],
};

export default function DryingCalculatorPage() {

	return (
		<div className="space-y-8 px-5 py-8">
            <section style="padding-bottom: 40px">

                    <div className="container">

                        <h1 style="font-weight: normal; ont-size: 40px; line-height: 48px;">Water Damage Restoration</h1>

                        <p>Here at Climate Dry we aim to provide the ultimate climate control solutions and drying packages for every application. From small leaks to extensive flood damage, our packages are designed to solve all your water worries. We understand the panic that ensues following an unexpected leak or flood, and the second surge of fear that arises when approaching the complex process of water damage of restoration. We offer a comprehensive range of domestic and industrial Water Damage Restoration packages to make your life post-flood that bit easier. Our Water Damage Restoration packages and equipment are designed to cater to various needs at every stage, ensuring that your property is restored to its pre-damage condition with maximum ease and minimal disruption. Explore our expertly tailored packages below to find the right solution for you, whether you are a property owner affected by water damage searching for the answer to your prayers, or a restoration technician looking for an essential set-up to conquer any challenge.</p>

                    </div>

                </section>

                <section style="background-color: var(--grey-light)">

                    <div className="container">

                        <div className="c-text-img-columns">

                            <div className="c-text-img-columns__content">

                                <div style="padding: 0; max-width: 526px;">

                                    <h2>Water Damage</h2>

                                    <p>Water damage can manifest in various ways, indicating potential issues that need immediate attention. Common signs include discolouration or staining on walls, ceilings, and floors, often appearing as yellow, brown, or dark patches. Peeling or bubbling paint and wallpaper can also signal underlying moisture problems. Musty or damp odours suggest mould growth, while visible mould spores are a clear indicator. Warped or buckling floors, swollen wood, and soft spots in drywall are other common symptoms. Additionally, increased humidity levels and condensation on windows can point to underlying excess moisture in the atmosphere. Early detection and prompt action are crucial to prevent further deterioration and costly repairs.</p>

                                </div>

                            </div>
                            <div>
                                <img src="/img/CD-water-damage-banner.webp" alt="Water Damage" className="c-text-img-columns_img-expand" width="608" height="346" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 60px 0 20px;">

                    <div className="container">

                        <div className="title title-reverse">
                            <p>Identifying water damage severity</p>
                            <h2>Classes of water damage</h2>
                        </div>

                        <div className="text-center" style="padding: 20px 0 40px 0; max-width: 930px; margin: 0 auto;">
                            <p>There are four levels of water damage, depending on the severity of the issue and the required response.</p>
                        </div>

                        <div className="c-icon-ctas">

                            <div>
                                <img src="/img/CD-Water-Damage-Class1@2x.webp" loading="lazy" alt="Water Damage Class 1" width="125" height="90" />
                                <p className="c-icon-ctas__title">Class 1</p>
                                <p>This is the least severe of all four levels, where minimal damage has occurred. Any damage is confined to a small area, or the area was only damp for a short period of time. Class one water loss affects materials with low-permeance or low-porosity materials which as plywood, tile and concrete. Minimum moisture is absorbed by these materials, which release moisture slowly.</p>
                            </div>

                            <div>
                                <img src="/img/CD-Water-Damage-Class2@2x.webp" loading="lazy" alt="Water Damage Class 2" width="125" height="90" />
                                <p className="c-icon-ctas__title">Class 2</p>
                                <p>At this stage, water damage has spread beyond a confined area and affects the entire room. Escape of water is less than 24 inches, soft furnishings may be affected, and moisture may remain in structural materials. There will be a noticeable damp odour. The restoration process is likely to be more intricate.</p>
                            </div>

                            <div>
                                <img src="/img/CD-Water-Damage-Class3@2x.webp" loading="lazy" alt="Water Damage Class 3" width="125" height="90" />
                                <p className="c-icon-ctas__title">Class 3</p>
                                <p>This class involves significant water exposure to structural components like floors, walls, and ceilings. Class three water loss usually originates from overhead, saturating the entire room below. The restoration process will be more complex and necessitate a detailed assessment.</p>
                            </div>

                            <div>
                                <img src="/img/CD-Water-Damage-Class4@2x.webp" loading="lazy" alt="Water Damage Class 4" width="125" height="90" />
                                <p className="c-icon-ctas__title">Class 4</p>
                                <p>This is the most critical level of damage requiring speciality drying solutions. Expect extensive water escapes creating deep pockets of saturation in structural materials. Restoration should be undertaken by qualified damage management specialists with the appropriate expertise and professional drying equipment.</p>
                            </div>

                        </div>
                    </div>

                </section>

                <section style="padding: 60px 0 20px;">

                    <div className="container--sm">

                        <div className="title title-reverse">
                            <p>Identifying water type</p>
                            <h2>Categories of water damage</h2>
                        </div>

                        <div className="text-center" style="padding: 20px 0 40px 0; max-width: 930px; margin: 0 auto;">
                            <p>In addition to identifying the classes of water damage, it is also vital to identify the condition of liquid impacting the affected materials. In other words, how clean or dirty is the water? This is categorised into three types:</p>
                        </div>

                        <div className="c-icon-ctas">

                            <div>
                                <img src="/img/CD-Water-Damage-Clean-Water@2x.webp" loading="lazy" alt="Category 1: Clean Water" width="125" height="90" />
                                <p className="c-icon-ctas__title">Category 1: Clean Water</p>
                                <p>Clean water comes from a sanitary source, it is uncontaminated and poses no health risk if exposed to skin or consumed. Melting snow, rainwater, leaky appliance hoses and faulty toilet tanks are typical types of class one liquids.</p>
                            </div>

                            <div>
                                <img src="/img/CD-Water-Damage-Grey-Water@2x.webp" loading="lazy" alt="Category 2: Grey Water" width="125" height="90" />
                                <p className="c-icon-ctas__title">Category 2: Grey Water</p>
                                <p>Grey water is contaminated with bacteria or pollutants that is harmful if exposed to and likely to cause illness if ingested. The source of grey water is usually from discharge or overflow of liquids from dishwasher/washing machine, toilets with urine, or stagnant water. Category 2 water damage requires significant amounts of materials and items to be removed from your home before the restoration process beings.</p>
                            </div>

                            <div>
                                <img src="/img/CD-Water-Damage-Black-Water@2x.webp" loading="lazy" alt="Category 3: Black Water" width="125" height="90" />
                                <p className="c-icon-ctas__title">Category 3: Black Water</p>
                                <p>Black water is the most severe and hazardous category of water damage. It involves water sources from sewage, seawater and grossly bacteria-ridden wastewater. Black water is typically foul-smelling and contains high levels of harmful contaminants, such as bacteria and toxins, posing a serious health risk if exposed to.</p>
                            </div>

                        </div>
                    </div>

                </section>

                <section style="padding: 60px 0 20px;">

                    <div className="container--sm">

                        <div className="title title-reverse">
                            <p>Package Deals</p>
                            <div style="max-width: 612px; margin: 0 auto">
                                <h2>Flood/Escape of Water Mitigation Packages</h2>
                            </div>
                        </div>

                    </div>

                </section>

                <section style="padding: 60px 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns reverse">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Small Package</h2>

                                    <p>Introducing the ultimate solution for minor water damage, this package is perfect for homeowners and small businesses dealing with <strong>leaks or small-scale flooding</strong>. It efficiently mitigates water escapes and ensures quick and effective restoration, ideal for those seeking post-pipe leak repairs or for those without flood insurance.</p>
                                    <p>This package includes a powerful compressor dehumidifier to remove excess moisture from the air, <strong>two</strong> multifaceted radial fans to enhance air circulation and drying, and <strong>two</strong> smart app-controlled electronic sensors for real-time monitoring and alerts that are displayed instantly in-app. Together, these tools offer a comprehensive solution to manage small-scale water damage effectively and efficiently, helping you restore your home with ease. Plus, with high-end moisture monitoring devices, you can detect and avoid potential leaks in the future.</p>

                                    <h3>Features</h3>

                                    <ul>
                                        <li>Primary Drying Solution</li>
                                        <li>Initial Assessment and Damage Report</li>
                                        <li>Moisture Mapping and Monitoring</li>
                                        <li>Professional Dehumidification</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/dantherm-escape-of-water-mitigation-package-small/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/1-CD-Flood-Water-Mitigation-PackagesSmallPackage.webp" alt="Flood Water Mitigation Packages Small" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Medium Package</h2>

                                    <p>Specially tailored for moderate water damage caused by flooding or water escapes, this package is perfect for <strong>homeowners facing moderate water damage</strong>, such as from a washing machine malfunction. This package includes enhanced tools and systems to efficiently dry out 2-3 rooms, offering a perfect solution for property managers and professionals alike seeking a comprehensive solution for more extensive water damage.</p>
                                    <p>An enhancement from the basic package, this bundle includes two robust compressor dehumidifiers to eliminate excess humidity from the air, four versatile radial fans to boost air circulation and accelerate drying, and two smart-app controlled electronic sensors for real-time monitoring and readings that are displayed instantly in-app. This premium array of equipment provides a comprehensive solution for efficiently managing minor water damage.</p>

                                    <h3>Features</h3>

                                    <ul>
                                        <li>Comprehensive Water Extraction Solution</li>
                                        <li>Moisture Mapping and Monitoring</li>
                                        <li>Advanced Drying Solution</li>
                                        <li>Professional Dehumidification</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/dantherm-escape-of-water-mitigation-package-medium/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/2-CD-Flood-Water-Mitigation-Packages-Medium.webp" alt="Flood Water Mitigation Packages Medium" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 0;">

                    <div className="container">

                        <div className="c-text-img-columns reverse">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Large Package</h2>

                                    <p>Designed to restore severe water damage, this expert package provides the ultimate arsenal of tools and equipment for effectively managing and restoring affected areas. This package is ideal restoration efforts in both residential and commercial properties, ensuring rapid and thorough mitigation and moisture monitoring.</p>
                                    <p>For extensive coverage of severe water damage, our ultimate package features four heavy-duty compressor dehumidifiers to remove excess moisture from the air, eight multifaceted radial fans to enhance air circulation and accelerate drying, and two smart-app controlled electronic sensors for real-time monitoring with instant in-app readings. This top-tier collection of equipment delivers a comprehensive solution for professionals to efficiently manage heavy flooding and severe leaks with ease and efficiency.</p>

                                    <h3>Features</h3>

                                    <ul>
                                        <li>Full-scale Water Extraction</li>
                                        <li>Detailed Damage Assessment</li>
                                        <li>High-capacity Drying and Dehumidification</li>
                                        <li>Structural Drying</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/dantherm-escape-of-water-mitigation-package-large/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/3-CD-Flood-Water-Mitigation-Packages-Large.webp" alt="Flood Water Mitigation Packages Large" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 50px 0;">

                    <div className="container--sm">

                        <div className="title title-reverse">
                            <div style="width: 621px; max-width: 100%; margin: 0 auto;">
                                <h2>Professional Restorers - Insulation Drying Kits</h2>
                            </div>
                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Starter Kit</h2>

                                    <p>Perfect for a water damage restoration technician who is looking to kickstart their business. This starter kit provides the basic tools and equipment needed for insulation drying, helping to prevent mould and structural damage, as well as detecting and monitoring moisture concentrations.</p>
                                    <p>This starter kit is designed to provide efficient moisture extraction, exceptional drying results and on-the-go filtration, ventilation and air quality improvements thanks to the powerful yet lightweight devices incorporated. Also featured is several Trotec measuring instruments for air quality tracking and moisture mapping, of which can be remotely controlled via smartphone app. Perfect for busy, one-man restoration businesses.</p>

                                    <h3>Features</h3>
                                    
                                    <ul>
                                        <li>Incorporated 40 Individual Devices and Accessories</li>
                                        <li>Entry-level Drying Equipment</li>
                                        <li>Moisture Meters</li>
                                        <li>Basic Dehumidifiers</li>
                                        <li>App-Controlled Measurement & Tracking Instruments</li>
                                        <li>Accredited 2-Day Water Damage Restoration Course</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/dantherm-water-damage-restoration-air-quality-management-starter-kit/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/4-CD-Professional-Restorers-insulation-Drying-Kits-Starte-Kit.webp" alt="Professional Restorers insulation Drying Kits Starter Kit" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns reverse">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Basic Kit</h2>

                                    <p>A step up from the Starter Kit, this package is ideal for those who require more robust equipment for efficient insulation drying. This kit is complete with premium drying systems and high-tech tools to provide basic insulation drying of walls, ceilings and insulated screed floors up to 70m².</p>
                                    <p>This basic kit features an ultra-compact condenser dryer, a manifold drying system, and a negative pressure insulation dryer. A professional thermal imaging camera detects real-time temperature changes. The world’s first manifold drying system features advanced technology for energy efficiency and sustainability. The AERCUBE drying system includes a water separator with a dirty water pump, two-stage HEPA filtration, a brushless multi-stage noise box with a turbine, and a sound silencer. All modules stack together for safe and easy transportation.</p>

                                    <h3>Features</h3>

                                    <ul>
                                        <li>Premium Drying Solutions and Accessories</li>
                                        <li>Manifold Drying System with HEPA Filtration</li>
                                        <li>Professional Thermography in Handheld Device</li>
                                        <li>Accredited 2-Day Water Damage Restoration Course</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/dantherm-professional-water-damage-restorers-basic-insulation-drying-kit/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/5-CD-Professional-Restorers-insulation-Drying-Kits-Basic-Kit.webp" alt="Professional Restorers insulation Drying Kits Basic Kit" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 0;">

                    <div className="container">

                        <div className="c-text-img-columns">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Advanced Kit</h2>

                                    <p>The ultimate package for professional restorers, equipped with top-of-the-line tools and equipment for efficient and thorough insulation drying. This kit provides the equipment required to engage in more advanced installation for drying of insulated constructions. Enabling greater flexibility of how the drying system can be used to suit a wider scope of projects.</p>
                                    <p>Like the Basic Kit, this bundle includes the same manifold system, equipped with connection hoses and lashing straps for connecting in a tower system. The tower design allows all modules to work concurrently, saving space and ensuring optimal organisation on site. The handheld thermal imaging camera can be used anywhere on site for precise real-time readings of moisture concentration through walls and flooring. The adsorption dehumidifier included in this kit accelerates the drying process and can be placed close to the detected moisture deposits for maximum efficiency.</p>

                                    <h3>Features</h3>

                                    <ul>
                                        <li>Professional-grade Drying Equipment</li>
                                        <li>Manifold Drying System with HEPA Filtration</li>
                                        <li>Industrial-strength Dehumidifier</li>
                                        <li>Professional Thermography in Handheld Device</li>
                                        <li>Accredited 2-Day Water Damage Restoration Course</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/dantherm-professional-water-damage-restorers-advanced-insulation-drying-kit/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/6-CD-Professional-Restorers-insulation-Drying-Kits-Advanced-Kit.webp" alt="Professional Restorers insulation Drying Kits Advanced Kit" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 50px 0 50px;">

                    <div className="container--sm">

                        <div className="title title-reverse">
                            <div style="width: 621px; max-width: 100%; margin: 0 auto;">
                                <h2>Target Drying Packages</h2>
                            </div>
                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns reverse">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Small Package</h2>

                                    <p>Suitable for minor drying tasks, this package supplies the fundamental tools for efficient target drying, ensuring effective moisture removal. This kit is especially ideal for drying efforts in tight, confined spaces.</p>
                                    <p>This package is comprised of high-quality, non-destructive drying equipment, including a professional dehumidifier, a multifaceted radial fan and a portable infrared heating panel to achieve rapid drying and optimal performance in small, targeted areas.</p>

                                    <h3>Features</h3>
                                    
                                    <ul>
                                        <li>Compact Drying Equipment</li>
                                        <li>Energy-Efficient Infrared Drying Panel</li>
                                        <li>Professional Dehumidifier</li>
                                        <li>Efficient air movers</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/water-damage-restoration-small-target-drying-package/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/7-CD-Target-Drying-small.webp" alt="Target Drying Small Package" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Large Package</h2>

                                    <p>For extensive moisture issues requiring focused drying, this package is the ultimate solution. This all-inclusive kit is designed to handle severe water damage in confined spaces, ensuring your property is restored quickly and thoroughly.</p>
                                    <p>This package is tailored for those who need a reliable, efficient and powerful solution to tackle significant water damage in hard-to-reach places with ease and precision. Featuring two energy-efficient infrared heating panels, two multifaceted radial fans and a professional powerful dehumidifier, along with essential accessories, this kit delivers rapid drying and top-tier performance in focused applications.</p>

                                    <h3>Features</h3>

                                    <ul>
                                        <li>First-rate Focused Drying Equipment</li>
                                        <li>High-performance Air Movers</li>
                                        <li>Energy-Efficient Infrared Drying Panels</li>
                                        <li>Professional Dehumidifier</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/water-damage-restoration-large-target-drying-package/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/8-CD-Target-Drying-large.webp" alt="Target Drying Large Package" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 0;">

                    <div className="container">

                        <div className="c-text-img-columns reverse">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Wall Cavity Package</h2>

                                    <p>Specially designed for restoring water damage in wall cavities, this package ensures thorough drying in hard-to-reach areas, preventing mould growth and long-term structural damage. This comprehensive wall cavity drying package is versatile, dependable and easily portable – ideal for any water damage emergency.</p>
                                    <p>Featuring in the package is the AERCUBE® manifold system, a modular and flexible drying system that can applied using the vacuum method for targeted cavity drying. The manifold system works in conjunction with the professional dehumidifier included in the package to dry and thoroughly filter the air inside the cavities. The clean, dry air is then circulated inside the wall, removing remaining moisture deposits and preventing it from re-entering the walls.</p>

                                    <h3>Features</h3>
                                    
                                    <ul>
                                        <li>Efficient Cavity Drying Equipment</li>
                                        <li>Vacuum Drying Method</li>
                                        <li>High-efficiency Dehumidifier</li>
                                        <li>HEPA 99.95% Filtration</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/water-damage-restoration-wall-cavity-drying-package/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/9-CD-wall-cavity-package.webp" alt="wall cavity package" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 50px 0;">

                    <div className="container--sm">

                        <div className="title title-reverse">
                            <div style="width: 621px; max-width: 100%; margin: 0 auto;">
                                <h2>Renovation and Restoration Works – Air Quality Management</h2>
                            </div>
                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Starter Package</h2>

                                    <p>This entry-level package is your ultimate solution for efficient moisture control and air quality management. The comprehensive kit is designed to improve indoor air quality during and after restoration works, ensuring a safe and healthy environment.</p>
                                    <p>This starter kit features a high-quality air scrubber equipped with a 2-stage HEPA filtration system, plus a state-of-the-art measuring device, allowing precise tracking of humidity and moisture levels. Perfect for both professionals and beginners, it offers a cost-effective solution to maintain a healthy environment post-renovation. Elevate your restoration projects with this essential, all-in-one kit.</p>

                                    <h3>Features</h3>
                                    
                                    <ul>
                                        <li>High-Powered Air Scrubber</li>
                                        <li>HEPA 99.95% Pre and Main Filtration</li>
                                        <li>Air Quality Monitoring Device</li>
                                        <li>Accredited 2-Day Water Damage Restoration Course</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/dantherm-water-damage-restoration-air-quality-management-starter-kit/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/10-CD-Renovation-Restoration-starter.webp" alt="Renovation Restoration Starter Package" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns reverse">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Professional Package</h2>

                                    <p>Introducing this comprehensive solution for superior moisture control and air quality management. This advanced package features a powerful air scrubber, a precise particle counter, and a robust wall containment system, ensuring thorough drying and air purification in a sealed-off area.</p>
                                    <p>The high-efficiency air mover equipped with 2-stage filtration system provides rapid drying and air cleansing, while the advanced mobile monitoring tool tracks humidity and moisture levels accurately. Designed for versatility, durability and ease of use, this professional-grade package delivers rapid, reliable results, ensuring a healthy, safe environment post-renovation. This package is especially ideal for restoration experts looking to enhance their capabilities with an all-inclusive, premium package.</p>

                                    <h3>Features</h3>
                                    
                                    <ul>
                                        <li>High-capacity Air Purifier</li>
                                        <li>Advanced HEPA filtration System</li>
                                        <li>Continuous Air Quality Monitoring</li>
                                        <li>Seal-tight Containment Wall</li>
                                        <li>Accredited 2-Day Water Damage Restoration</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/water-damage-restoration-professional-air-quality-management-kit/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/11-CD-Renovation-Restoration-professional.webp" alt="Renovation Restoration Professional Kit" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Mould Mitigation Package</h2>

                                    <p>Identify, remove and prevent the recurrence of mould in residential or commercial properties with our specialised package. This all-in-one mould mitigation remedy kit includes a powerful air scrubber, a precise particle measuring device, and a robust wall containment system to ensure effective containment during the purification process. The ozone generator with regeneration function and accompanying ozone meter deliver thorough mould elimination and monitoring.</p>
                                    <p>This comprehensive package provides a safe source of speedy sanitisation within an airtight containment zone, offering an ideal solution for eliminating mould growth, germs and odour-carrying molecules in even the hardest-to-reach places. Using a chemical-free disinfection process, this mould mitigation package is one of the safest and most efficient of its kind. By addressing both the current mould issue and its underlying causes, this mitigation kit provides a long-lasting solution for ensuring a healthy indoor environment.</p>

                                    <h3>Features</h3>
                                    
                                    <ul>
                                        <li>Expert Sanitisation Device</li>
                                        <li>Professional-grade Mould Detection</li> <li>Airtight Containment System</li>
                                        <li>Preventative Treatment Solutions</li>
                                        <li>Chemical-Free Disinfection Process</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/dantherm-mould-mitigation-package/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/12-CD-mould-mitigation-package.webp" alt="Mould mitigation package" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 50px 0;">

                    <div className="container--sm">

                        <div className="title title-reverse">
                            <div style="max-width: 612px; margin: 0 auto">
                                <h2>Professional Leak Detection</h2>
                            </div>
                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns reverse">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Starter Package</h2>

                                    <p>Detect and prevent potential leaks and floods with this specialist leak detection package, comprised of state-of-the-art investigative tools and devices. This comprehensive solution is designed to identify and address leaks before they escalate into costly problems. Perfect for homeowners and professionals alike, this starter package ensures peace of mind with advanced leak detection technology and premium equipment.</p>
                                    <p>Our starter package includes a range of essential tools: a torchlight for clear visibility, tracer dye for pinpointing leaks, a sound locator for hidden leaks, a thermal imaging camera for detecting moisture, and a moisture indicator for extra confirmation. Additionally, multiple heat and moisture measuring devices provide accurate readings to ensure thorough inspections and effective mitigation.</p>

                                    <h3>Features</h3>

                                    <ul>
                                        <li>Expert Sanitisation Device</li>
                                        <li>Professional-grade Mould Detection</li>
                                        <li>Airtight Containment System</li>
                                        <li>Preventative Treatment Solutions</li>
                                        <li>Chemical-Free Disinfection Process</li>
                                    </ul>
                                    
                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/professional-leak-detection-starter-kit/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/13-CD-professional-leak-detection-starter.webp" alt="Professional Leak Detection Starter Kit" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Advanced Package</h2>

                                    <p>For those seeking a more sophisticated leak detection solution, the Advanced Package offers the most precise and reliable tools and equipment for professional leak detection and full water damage assessment. Stay ahead of potential problems with innovatory technology developed to provide the highest accuracy and efficiency.</p>
                                    <p>Our advanced package features a selection of high-end measuring devices, designed to track, monitor and detect humidity, air velocity, temperature, moisture and more, providing a comprehensive assessment to enable thorough climate control. Also included is a combination detector with ground microphone, a hand sensor, and a thermal imaging camera for precise leak detection. Plus, an industrial videoscope permits visual access to hard-to-reach areas for investigations into cavities and other tight spaces. Equip yourself with this premium package to ensure thorough inspections for accurate leak detection for effective water damage restoration.</p>

                                    <h3>Features</h3>
                                    
                                    <ul>
                                        <li>High-sensitivity Leak Detection Equipment</li>
                                        <li>Complete Climate Assessment Kit</li>
                                        <li>Professional Thermal Imaging Camera</li>
                                        <li>Accredited 2-Day Water Damage Restoration Course</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/dantherm-professional-leak-detection-advanced-kit/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/14-CD-professional-leak-detection-advanced.webp" alt="Professional Leak Detection Advanced Kit" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns reverse">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Expert Package</h2>

                                    <p>The ultimate package for professionals, providing leading-edge detection devices designed to identify and mitigate leaks with precision, efficiency, and reliability. Perfect for professionals seeking to upgrade their equipment, this comprehensive package ensures that you can detect leaks rapidly to minimise damage and provide peace of mind to your clients, all whilst saving costs.</p>
                                    <p>This package includes a combination detector equipped with a ground microphone for pinpoint accuracy, a hydrogen leak detector for locating even the smallest leaks, and a flat roof leak detector for comprehensive roof inspections. Additionally, it features an industrial videoscope for detailed internal inspections and a thermal imaging camera to identify hidden or trapped moisture and temperature variations, ensuring thorough and effective leak detection.</p>

                                    <h3>Features</h3>
                                    
                                    <ul>
                                        <li>State-of-the-art Leak Detection Equipment</li>
                                        <li>Advanced Moisture Mapping Systems</li>
                                        <li>Flat Roof Detection System</li>
                                        <li>Professional Thermal Imaging Camera</li>
                                        <li>Accredited 2-Day Water Damage Restoration Course</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/dantherm-professional-leak-detection-expert-kit/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/15-CD-professional-leak-detection-expert.webp" alt="Professional leak detection expert" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 50px 0;">

                    <div className="container--sm">

                        <div className="title title-reverse">
                            <div style="max-width: 612px; margin: 0 auto">
                                <h2>Simplify Remote Monitoring Kits</h2>
                            </div>
                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Basic Humidity Kit</h2>

                                    <p>Monitor humidity levels remotely with our Basic Kit, ideal for maintaining optimal moisture conditions in your property. The Simplify Remote Monitoring kit is designed to streamline humidity management across various industries. With remote monitoring and a cloud-based system, this user-friendly solution visualises and analyses real-time data, maximising productivity, saving time and costs, and helping predict and prevent potential issues.</p>
                                    <p>The kit includes a control unit, <strong>six</strong> sensor boxes with <strong>six</strong> sensor probes, a relay box, and a CC 4 box, along with a 24-month subscription. This comprehensive package offers remote humidity monitoring through a cloud-based system with a user-friendly interface. Ideal for various industries, it ensures efficient and effective humidity control, enhancing worksite productivity.</p>

                                    <h3>Features</h3>
                                    
                                    <ul>
                                        <li>Remote humidity sensors</li>
                                        <li>Basic monitoring interface</li>
                                        <li>Alert system for high humidity</li>
                                        <li>User-friendly setup</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/simplify-remote-monitoring-basic-humidity-control-kit/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/16-CD-Simplify-Remote-Monitoring-Kits-Basic.webp" alt="Simplify Remote Monitoring Kits - Basic" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns reverse">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Water Damage Restoration Kit</h2>

                                    <p>This remote monitoring solution is engineered to provide comprehensive climate monitoring for water damage restoration projects, ensuring real-time oversight of moisture levels. Utilising remote monitoring and a cloud-based system, this user-friendly kit visualizes and analyses real-time data, enhancing productivity, reducing costs, and helping predict and prevent potential issues.</p>
                                    <p>This kit includes a control unit, six sensor boxes with six sensor probes, a relay box, and a CC 4 box, six resistive probes, along with a 24-month subscription. It offers remote climate monitoring through a cloud-based system with a user-friendly interface. Ideal for various industries, it ensures uninterrupted monitoring and non-stop observation for effective water damage restoration, optimising worksite productivity.</p>

                                    <h3>Features</h3>
                                    
                                    <ul>
                                        <li>Advanced remote sensors</li>
                                        <li>Detailed monitoring dashboard</li>
                                        <li>Real-time alerts</li>
                                        <li>Professional setup support</li>
                                    </ul>

                                    <div className="c-text-img-columns_buttons">
                                        <a href="/p/simplify-remote-monitoring-water-damage-restoration/" className="btn--alt2">View Product</a>
                                    </div>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/17-CD-Water-Damage-Restoration-kit.webp" alt="Water Damage Restoration kit" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 0 0 20px;">

                    <div className="container">

                        <div className="c-text-img-columns">

                            <div className="c-text-img-columns__content" style="background-color: var(--grey-light);">

                                <div>

                                    <h2>Accessory Kit</h2>

                                    <p>Enhance your remote monitoring system with this Simplify Accessory Kit is designed to enhance and expand your climate monitoring capabilities. Ideal for various industries, this comprehensive kit includes additional accessories; essential sensors and probes tailored to ensure accurate and reliable data collection, maximising efficiency and effectiveness in managing environmental conditions.</p>
                                    <p>This kit includes <strong>six</strong> Simplify Sensor Boxes, <strong>three</strong> Simplify Probes (24cm), <strong>three</strong> Sensor Probes (3m), <strong>six</strong> Simplify IAQ Probes, <strong>six</strong> Simplify Resistive Probes, and <strong>two</strong> Simplify Relays. Together, these components provide a robust solution for detailed climate monitoring, offering precise data to support optimal decision-making and improved environmental control.</p>

                                    <h3>Features</h3>
                                    
                                    <ul>
                                        <li>Additional sensors</li>
                                        <li>Extended monitoring range</li>
                                        <li>Integration with existing systems</li>
                                        <li>Technical support</li>
                                    </ul>

                                </div>

                            </div>
                            <div className="c-text-img-columns__image">
                                <img src="/img/CD-insulation-drying-starter-kit.webp" alt="Starter Kit" width="508" height="508" loading="lazy" />
                            </div>

                        </div>

                    </div>

                </section>

                <section style="padding: 60px 0;">

                        <div className="container--sm">

                            <div className="text-center">

                                <div className="title title-reverse">
                                    <h2>Conclusion</h2>
                                </div>

                                <div style="max-width: 920px; margin: 0 auto;">
                                    <p>Effective water damage restoration is crucial to preserving the integrity of your property and ensuring a healthy living environment. Our range of packages is designed to address various needs, from small-scale water escapes to extensive flooding, providing you with the tools and support needed to restore your property efficiently. Choose the package that best fits your requirements and let our professional team assist you in mitigating and repairing water damage with ease and expertise.</p>
                                </div>

                            </div>
                        </div>

                </section>
		</div>
	);
}
